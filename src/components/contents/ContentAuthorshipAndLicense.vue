<script setup>
import SectionContent from '@partials/SectionContent.vue'
import SectionContentWrapper from '@partials/SectionContentWrapper.vue'
</script>

<template>
  <SectionContent :isCover="false" :overflowAuto="false">
    <SectionContentWrapper>
      <p>
        Crafted with ❤️ by
        <a href="https://learnwithghaniy.web.id" target="_blank" class="text-blue-500"
          >Abdul Hakim Ghaniy</a
        >
        <br />
        (Learn With Ghaniy)
      </p>
      <div class="common-licenses text-xs">
        <p>
          This Wedding Invitation is licensed under GNU General Public License v3.0. Feel free to
          use it!
        </p>
        <p>
          All assets (including images, music, fonts, and layout) are licensed under those own
          creators. Look at the credits section on <a href="https://github.com/SiGhaniyGabut/my-wedding-invitation">this repository</a> for more
          information.
        </p>
      </div>
    </SectionContentWrapper>
  </SectionContent>
</template>
