import { customAlphabet } from 'nanoid';
import libphonenumbers from 'libphonenumbers';
import mustache from 'mustache';
import xlsx from 'node-xlsx';
import fs from 'fs';

// Get name of sheets
class GuestExtractor {
    constructor(workSheetsFromBuffer) {
        this.sheets = workSheetsFromBuffer;
    }

    getSheet(sheetName) {
        return this.getSheets(sheetName)[0];
    }

    getSheetNames() {
        return this.sheets.map((sheet) => sheet.name);
    }

    getSheets({ sheetName, whatsAppSheet = { formattedPhone: false }, guestCode = { generate: false, options: {} } } = {}) {
        return this.sheets.filter((sheet) => !sheetName || sheet.name.match(new RegExp(sheetName, 'gi'))).map((sheet) => {
            if (this.isPredefinedSheet(sheet.name)) return sheet;
            if (this.isWhatsAppSheet(sheet.name) && whatsAppSheet.formattedPhone) sheet.data = this.#formatWhatsAppPhone(sheet.data);
            if (guestCode.generate) sheet.data = this.#generateCode(sheet.data, guestCode.options);

            return sheet;
        });
    }

    getWhatsAppSheets({ formattedPhone, guestCode } = {}) {
        return this.getSheets({ sheetName: 'whatsapp', whatsAppSheet: { formattedPhone }, guestCode });
    }

    isWhatsAppSheet(sheetName) {
        return sheetName.match(/whatsapp/gi);
    }

    isPredefinedSheet(sheetName) {
        return sheetName.match(/predefined/gi);
    }

    saveGuests({
        sheetName,
        guestCode = { generate: true, options: {} },
        predefined = { guests: [], srcpath: '' },
        whatsAppSheet = { formattedPhone: true },
        broadcast = { generate: false, template: '', invitationURL: '' } } = {}) {

        const sheets = this.getSheets({ sheetName, whatsAppSheet, guestCode });
        if (guestCode.generate) this.#saveGuestsCode({ data: sheets.map((sheet) => sheet.data).flat(), predefined });
        if (broadcast.generate) this.#saveGuestsBroadcast({ sheets, template: broadcast.template, invitationURL: broadcast.invitationURL })
    }

    #saveGuestsCode({ data, predefined = { guests: [], srcpath: '' } } = {}) {
        let guests = data.map((row) => ({ name: row[0], guestCode: row[row.length - 1] }));

        if (predefined.guests) guests = [...predefined.guests, ...guests];
        if (predefined.srcpath) {
            const predefinedGuests = JSON.parse(fs.readFileSync(predefined.srcpath));
            guests = [...predefinedGuests, ...guests];
        }

        // Save guests to JSON file in /public folder
        fs.writeFileSync('./public/guests.json', JSON.stringify(guests, null, 2));
    }

    #saveGuestsBroadcast({ sheets, template, invitationURL } = {}) {
        const broadcastMessage = (name, link) => mustache.render(template, { name, link });

        const broadcastSheet = sheets.map((sheet) => {
            sheet.data = sheet.data.map((row) => {
                if (this.isWhatsAppSheet(sheet.name)) {
                    const [name, phone, guestCode] = row;
                    const message = broadcastMessage(name, invitationURL + guestCode);
                    const waLinkMessage = 'https://wa.me/' + phone + '?text=' + encodeURIComponent(message);

                    return [...row, waLinkMessage].filter((data) => data);
                }

                const [name, guestCode] = row;
                const message = broadcastMessage(name, invitationURL + guestCode);

                return [...row, message].filter((data) => data);
            });

            return sheet;
        });

        fs.writeFileSync('./GUESTS_BROADCAST.xlsx', xlsx.build(broadcastSheet));
    }

    #formatWhatsAppPhone(data) {
        const PNF = libphonenumbers.PhoneNumberFormat;
        const phoneUtil = libphonenumbers.PhoneNumberUtil.getInstance();

        return data.map((row) => {
            const [name, phone, countryCode] = row;
            const parsedPhone = phoneUtil.parseAndKeepRawInput(phone, countryCode);

            if (!phoneUtil.isValidNumberForRegion(parsedPhone, countryCode)) return row;

            const formattedPhone = phoneUtil.formatOutOfCountryCallingNumber(parsedPhone, PNF.INTERNATIONAL);
            return [name, formattedPhone.replace(/[\s+-]/g, '')];

        }).filter((guest) => guest);
    }

    #generateCode(data, { codeAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', length = 10 } = {}) {
        return data.map((row) => { return [...row, customAlphabet(codeAlphabet, length)()] }).filter((guest) => guest);
    }
}

const workSheetsFromBuffer = xlsx.parse(fs.readFileSync('./GUESTS.xlsx'));
const broadcastTemplate = fs.readFileSync('./guest-broadcast-template.mustache', 'utf8');
const guestExtractor = new GuestExtractor(workSheetsFromBuffer);

guestExtractor.saveGuests({
    broadcast: { generate: true, template: broadcastTemplate, invitationURL: 'https://wedding.learnwithghaniy.web.id/' }
})
