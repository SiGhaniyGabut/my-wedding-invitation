<script setup>
import { ref, onMounted } from 'vue'

defineProps({
  imageSources: Array,
})

const gridElement = ref(null)
const getImageOrientation = (el) => {
  if (el.naturalWidth > el.naturalHeight) return 'landscape'

  return 'portrait'
}

const addImageOrientationClass = (el) => {
  el.classList.add(getImageOrientation(el))
}

const getGridSize = (gridElement) => {
  const computedStyle = getComputedStyle(gridElement)
  const templateColumns = computedStyle.gridTemplateColumns.split(' ').length
  const templateRows = computedStyle.gridTemplateRows.split(' ').length

  return {
    columns: templateColumns,
    rows: templateRows
  }
}

const spanLandscapeImages = async (landscapeImages) => {
  const images = await Promise.all(landscapeImages)

  // If there are no landscape images, there's nothing more to do
  if (images.length === 0) return

  // Add col-span-2 class to the first landscape image
  images[0].classList.add('col-span-2')

  // If there's more than one landscape image, add col-span-2 class to the last
  if (images.length > 1) images[images.length - 1].classList.add('col-span-2')
}

onMounted(async () => {
  // Wait for all images to load
  const images = Array.from(gridElement.value.querySelectorAll('img'))
  await Promise.all(images.map((img) => new Promise((resolve) => (img.onload = resolve))))

  // Add orientation classes to images
  await spanLandscapeImages(images.filter((img) => img.classList.contains('landscape')))

  // Get the grid size
  const { columns, rows } = getGridSize(gridElement.value)
  console.log(columns, rows)
})

</script>

<template>
  <div
    :images="imageSources"
    class="images grid grid-cols-3 grid-flow-dense gap-2"
    ref="gridElement"
    v-viewer
  >
    <img
      v-for="src in imageSources"
      :key="src"
      :src="src"
      class="object-cover w-full h-full m-0 shadow-md hover:cursor-pointer hover:transform hover:scale-95 transition-transform duration-200 rounded-md"
      @load="addImageOrientationClass($event.target)"
    />
  </div>
</template>
