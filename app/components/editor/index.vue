<template>
  <div id="stamp-editor" class="max-w-[1300px] mx-auto border border-gray-200 rounded-lg bg-blue-50 p-2 md:p-4 my-4">
    <!-- 顶部工具栏 -->
    <div class="bg-white border border-gray-200 shadow-sm rounded-lg">
      <div class="text-sm md:text-base border-b border-gray-200 p-2 text-black font-semibold">
        Create your own stamp © stampdy.com
      </div>
      <div class="mx-auto flex flex-col p-2 md:p-4">
        <!-- 移动端布局 - 2x2网格 -->
        <div class="grid grid-cols-2 gap-2 sm:grid-cols-4 md:hidden border-b border-gray-100 pb-2">
          <!-- Select Template 按钮 -->
          <UButton
            icon="i-custom-select"
            size="sm"
            color="primary"
            variant="solid"
            class="cursor-pointer font-semibold flex flex-row items-center justify-center gap-1 sm:gap-2 w-full py-2"
            @click="templatesDialog = true"
          >
            <span class="text-xs sm:text-sm whitespace-nowrap">Select Template</span>
          </UButton>

          <!-- Reset 按钮 -->
          <UButton
            icon="i-custom-refresh"
            size="sm"
            color="primary"
            variant="solid"
            class="cursor-pointer font-semibold flex flex-row items-center justify-center gap-1 sm:gap-2 w-full py-2"
            @click="reset"
          >
            <span class="text-xs sm:text-sm">Reset</span>
          </UButton>

          <!-- Choose Color 按钮 -->
          <label
            for="color-picker-mobile"
            class="cursor-pointer flex flex-row items-center justify-center gap-1 sm:gap-2 w-full py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition-colors"
          >
            <input
              id="color-picker-mobile"
              v-model="stampConfig.primaryColor"
              type="color"
              class="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer border border-gray-200 rounded"
            >
            <span class="text-xs sm:text-sm font-semibold">Choose Color</span>
          </label>

          <!-- Aging Effect 按钮 -->
          <UPopover
            arrow
            mode="click"
            :content="{
              align: 'center',
              side: 'bottom',
            }"
          >
            <UButton
              icon="i-custom-nold"
              size="sm"
              color="neutral"
              variant="outline"
              class="cursor-pointer font-semibold flex flex-row items-center justify-center gap-1 sm:gap-2 w-full py-2"
            >
              <span class="text-xs sm:text-sm">Aging Effect</span>
            </UButton>
            <template #content>
              <Placeholder class="w-70 m-2 inline-flex">
                <div class="flex flex-col">
                  <div class="text-sm mb-2 text-center text-gray-600 font-semibold">
                    Select
                  </div>
                  <USeparator class="mb-2" />
                  <div class="grid grid-cols-10 gap-1">
                    <UButton
                      color="neutral"
                      :variant="!stampConfig.aging.enable ? 'solid' : 'subtle'"
                      label="0"
                      size="xs"
                      class="cursor-pointer"
                      @click="() => {
                        stampConfig.aging.enable = false
                        stampConfig.aging.intensity = 0
                        stampConfig.aging.refresh()
                      }"
                    />
                    <UButton
                      v-for="i in 9"
                      :key="i"
                      color="neutral"
                      :variant="stampConfig.aging.enable && stampConfig.aging.intensity === i * 10 ? 'solid' : 'subtle'"
                      :label="i.toString()"
                      size="xs"
                      class="cursor-pointer"
                      @click="handleAgingEffect(i * 10)"
                    />
                  </div>
                </div>
              </Placeholder>
            </template>
          </UPopover>
        </div>

        <!-- 桌面端布局 - 保持原有样式 -->
        <div class="hidden md:flex md:flex-row md:items-center md:justify-between border-b border-gray-100 pb-2 md:pb-0">
          <!-- 左侧按钮 -->
          <UButton
            icon="i-custom-select"
            size="md"
            color="primary"
            variant="solid"
            class="cursor-pointer font-semibold w-full md:w-auto"
            @click="templatesDialog = true"
          >
            Select Template
          </UButton>

          <!-- 中间按钮组 -->
          <div class="flex flex-col md:flex-row items-stretch md:items-center space-y-2 md:space-y-0 md:space-x-2">
            <label
              for="color-picker-desktop"
              class="cursor-pointer py-2 px-3 w-full md:w-auto border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <input
                id="color-picker-desktop"
                v-model="stampConfig.primaryColor"
                type="color"
                class="w-5 h-5 md:w-6 md:h-6 cursor-pointer border border-gray-200 rounded"
              >
              <span class="text-sm md:text-base font-semibold">Choose Color</span>
            </label>
            <UPopover
              arrow
              mode="click"
              :content="{
                align: 'center',
                side: 'bottom',
              }"
            >
              <UButton
                icon="i-custom-nold"
                size="md"
                color="neutral"
                variant="outline"
                class="cursor-pointer font-semibold w-full md:w-auto py-2"
              >
                <span class="text-sm md:text-base">Aging Effect</span>
              </UButton>
              <template #content>
                <Placeholder class="w-70 m-4 inline-flex">
                  <div class="flex flex-col">
                    <div class="text-sm mb-2 text-center text-gray-600 font-semibold">
                      Select
                    </div>
                    <USeparator class="mb-2" />
                    <div class="grid grid-cols-10 gap-1">
                      <UButton
                        color="neutral"
                        :variant="!stampConfig.aging.enable ? 'solid' : 'subtle'"
                        label="0"
                        size="xs"
                        class="cursor-pointer"
                        @click="() => {
                          stampConfig.aging.enable = false
                          stampConfig.aging.intensity = 0
                          stampConfig.aging.refresh()
                        }"
                      />
                      <UButton
                        v-for="i in 9"
                        :key="i"
                        color="neutral"
                        :variant="stampConfig.aging.enable && stampConfig.aging.intensity === i * 10 ? 'solid' : 'subtle'"
                        :label="i.toString()"
                        size="xs"
                        class="cursor-pointer"
                        @click="handleAgingEffect(i * 10)"
                      />
                    </div>
                  </div>
                </Placeholder>
              </template>
            </UPopover>
          </div>

          <!-- 右侧按钮 -->
          <div class="lg:w-34 flex justify-end">
            <UButton
              icon="i-custom-refresh"
              size="md"
              color="primary"
              variant="solid"
              class="cursor-pointer font-semibold w-full md:w-auto"
              @click="reset"
            >
              Reset
            </UButton>
          </div>
        </div>
      </div>
    </div>

    <!-- 主要内容区域 - 移动端垂直布局 -->
    <div class="flex flex-col xl:flex-row xl:justify-between xl:h-[500px] mt-4 gap-4">
      <!-- 移动端顶部工具栏 -->
      <div class="xl:hidden bg-white rounded-lg shadow-md p-3">
        <div class="flex justify-center space-x-4">
          <UButton
            v-for="(Els, key) of groupedElementCtors"
            :key="key"
            variant="outline"
            color="neutral"
            size="md"
            class="flex-1 flex flex-row items-center justify-center gap-1 py-2 px-1"
            @click="showMobileElementPanel(String(key))"
          >
            <UIcon v-if="key === ElementAs.Image" name="i-custom-image" class="size-4" />
            <UIcon v-if="key === ElementAs.Shape" name="i-custom-shape" class="size-4" />
            <UIcon v-if="key === ElementAs.Text" name="i-custom-text" class="size-4" />
            <span class="text-xs font-semibold">{{ key }}</span>
          </UButton>
        </div>
      </div>

      <!-- 左侧区域 - 桌面端显示 -->
      <div class="hidden xl:flex bg-white rounded-lg shadow-md flex-col overflow-hidden">
        <div class="flex-1 flex overflow-hidden">
          <div class="border-r border-gray-200 w-[65px]">
            <div class="text-base font-medium text-center p-2">
              Add
            </div>
            <USeparator />

            <UPopover
              v-for="(Els, key) of groupedElementCtors"
              :key="key"
              mode="click"
              arrow
              :content="{
                align: 'center',
                side: 'right',
              }"
              @update:open="activePopoverType = $event ? String(key) : ''"
            >
              <div
                v-if="key === ElementAs.Image"
                class="p-3 text-center text-sm cursor-pointer font-medium transition-colors duration-200 hover:bg-gray-100 hover:font-bold"
                :class="{
                  'bg-gray-100 font-bold': activePopoverType === key,
                }"
              >
                <UIcon name="i-custom-image" class="size-7" />
                <p>Image</p>
              </div>
              <div
                v-if="key === ElementAs.Shape"
                class="p-3 text-center text-sm cursor-pointer font-medium transition-colors duration-200 hover:bg-gray-100 hover:font-bold"
                :class="{
                  'bg-gray-100 font-bold': activePopoverType === key,
                }"
              >
                <UIcon name="i-custom-shape" class="size-7" />
                <p>Shape</p>
              </div>
              <div
                v-if="key === ElementAs.Text"
                class="p-3 text-center text-sm cursor-pointer font-medium transition-colors duration-200 hover:bg-gray-100 hover:font-bold"
                :class="{
                  'bg-gray-100 font-bold': activePopoverType === key,
                }"
              >
                <UIcon name="i-custom-text" class="size-7" />
                <p>Text</p>
              </div>
              <USeparator />

              <template #content>
                <Placeholder :class="key === ElementAs.Image ? 'm-4 inline-flex' : 'm-4 inline-flex'">
                  <div class="h-full flex flex-col">
                    <!-- 图片类型筛选 (仅在Image类型时显示) -->
                    <div v-if="key === ElementAs.Image" class="mb-4">
                      <div class="flex items-center gap-2">
                        <span class="text-sm font-bold text-gray-700 whitespace-nowrap">Image Type:</span>
                        <USelect
                          v-model="selectedImageType"
                          :items="imageTypes"
                          placeholder="Select image type"
                          class="flex-1 min-w-[120px]"
                          size="md"
                        />
                      </div>
                    </div>

                    <!-- 调整网格布局：图片弹窗使用更大的网格 -->
                    <div :class="key === ElementAs.Image ? 'flex-1 grid grid-cols-3 gap-2 max-h-[350px] min-h-[235px] overflow-y-auto place-items-center px-1': 'flex-1 grid grid-cols-3 gap-2'">
                      <template v-if="key === ElementAs.Image">
                        <div
                          v-for="(src, idx) of filteredImagePresets"
                          :key="idx"
                          class="flex items-center justify-center w-20 h-26 border-1 rounded cursor-pointer hover:bg-slate-50"
                          @click="addImageElement(src)"
                        >
                          <img class="w-[90%] h-[85%] object-contain" :src="src">
                        </div>
                      </template>
                      <template v-else>
                        <div
                          v-for="(El, idx) of Els"
                          :key="idx"
                          class="flex items-center justify-center w-20 h-20 border-1 rounded cursor-pointer hover:bg-slate-50"
                          @click="addElement(new El())"
                          v-html="El.thumbnail"
                        />
                      </template>
                    </div>
                    <div v-if="key === ElementAs.Image" class="mt-3 relative">
                      <label
                        for="file"
                        role="button"
                        class="flex items-center justify-center h-9 w-full rounded-[4px] bg-[#E2E2E2] hover:bg-[#d5d5d5] text-black font-medium text-sm"
                      >
                        <el-icon :size="16"><Upload /></el-icon>
                        <span class="ml-1">Upload</span>
                      </label>
                      <input
                        id="file"
                        class="hidden"
                        type="file"
                        accept=".png,.webp,.svg"
                        @change="addCustomImage"
                      >
                    </div>
                  </div>
                </Placeholder>
              </template>
            </UPopover>
          </div>
          <div class="w-[280px]">
            <div class="text-base font-semibold text-center p-2">
              Select Element
            </div>
            <USeparator />
            <div class="h-[100%] overflow-y-auto">
              <div class="space-y-2 p-2" @mouseleave="highlightElement = null">
                <div
                  v-for="(el, i) of stampElements"
                  :key="el.uid"
                >
                  <div
                    class="w-full flex items-center space-x-1 cursor-pointer hover:bg-gray-100 p-2 rounded-md text-gray-600 hover:text-gray-900 text-sm font-medium"
                    :class="{
                      '!text-gray-300': !el.visible,
                      'bg-gray-100 text-[#757575]': el === activeElement,
                    }"
                    @click="focusElement(el)"
                    @mouseenter.stop="highlightElement = el"
                  >
                    <UIcon
                      v-if="el.visible"
                      name="i-custom-view"
                      class="size-5"
                      @click="el.visible = !el.visible"
                    />
                    <UIcon
                      v-else
                      name="i-custom-hide"
                      class="size-5"
                      @click="el.visible = !el.visible"
                    />

                    <div
                      v-if="isSVGString(el.thumbnail)"
                      class="thumbnail mx-2 thumbnail-svg"
                      v-html="el.thumbnail"
                    />
                    <img v-else class="thumbnail mx-2" :src="el.thumbnail">
                    <span
                      class="flex-1 overflow-hidden text-ellipsis whitespace-nowrap"
                    >{{ el.displayName }}</span>
                    <UIcon
                      name="i-custom-delete"
                      class="size-4"
                      @click.stop="removeElement(el, i)"
                    />
                  </div>
                  <USeparator />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Canvas 区域 - 响应式尺寸 -->
      <div class="relative w-full xl:w-[500px] sm:w-[55%] sm:mx-auto xl:h-auto bg-slate-50 rounded-lg shadow-md overflow-hidden" @contextmenu.prevent="false">
        <!-- Loading 动画覆盖层 -->
        <div
          v-if="canvasLoading"
          class="absolute inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center z-20 rounded-lg"
        >
          <UCard class="border-0 shadow-lg">
            <div class="flex flex-col items-center gap-4 p-6">
              <UIcon name="i-lucide-loader" class="w-10 h-10 animate-spin text-primary" />
              <div class="text-center">
                <h3 class="text-lg font-semibold mb-1">
                  Loading...
                </h3>
              </div>
              <UProgress :value="canvasProgress" class="w-32" />
            </div>
          </UCard>
        </div>

        <div
          class="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))]"
          style="background-size: 10px 10px"
        />
        <canvas ref="mainCanvas" class="relative w-full h-full" />
      </div>

      <!-- 移动端浮动元素选择按钮 -->
      <div class="xl:hidden fixed top-1/2 right-2 transform -translate-y-1/2 z-40">
        <USlideover
          v-model:open="mobileElementListOpen"
          side="right"
          :dismissible="false"
          :overlay="false"
          :modal="false"
          title="Select Elements"
          :ui="{
            content: 'w-48 max-w-[60vw] sm:w-56 sm:max-w-[50vw] h-1/2 max-h-[50vh] top-1/4 rounded-tl-lg rounded-bl-lg border-l border-t border-b border-gray-200 shadow-lg bg-white',
            body: 'max-h-[calc(50vh-4rem)] overflow-y-auto',
          }"
        >
          <UButton
            :icon="mobileElementListOpen ? 'i-lucide-chevron-right' : 'i-lucide-chevron-left'"
            size="sm"
            color="primary"
            variant="solid"
            class="rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex flex-row items-center gap-1 px-1 py-2 w-auto"
          >
            <div class="flex flex-col items-center text-xs font-medium">
              <span>L</span>
              <span>A</span>
              <span>Y</span>
              <span>E</span>
              <span>R</span>
              <span>S</span>
            </div>
          </UButton>

          <template #header>
            <div class="flex items-center justify-between w-full">
              <div class="flex items-center gap-2">
                <div class="text-base font-semibold">
                  Select Elements
                </div>
                <div class="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                  {{ stampElements.length }}
                </div>
              </div>
            </div>
          </template>

          <template #body>
            <!-- 弹窗左边中间的收起按钮 -->
            <div class="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 z-50">
              <UButton
                icon="i-custom-up"
                size="xl"
                color="primary"
                variant="solid"
                class="p-0 border-gray-200 shadow-lg rounded-full transition-all duration-200 bg-white hover:bg-gray-50 hover:shadow-xl hover:scale-105 active:scale-95"
                @click="mobileElementListOpen = false"
              />
            </div>

            <div v-if="stampElements.length === 0" class="text-center py-6">
              <UIcon name="i-lucide-layers" class="size-10 text-gray-300 mx-auto mb-2" />
              <p class="text-gray-500 text-xs">
                No elements
              </p>
              <p class="text-gray-400 text-xs mt-1">
                Add elements from the left toolbar
              </p>
            </div>

            <div v-else class="space-y-2">
              <div
                v-for="(el, i) of stampElements"
                :key="el.uid"
                class="flex items-center space-x-2 p-2 rounded-lg border transition-all duration-150 cursor-pointer"
                :class="{
                  'bg-blue-50 border-blue-200 shadow-sm': el === activeElement,
                  'border-gray-200 hover:border-gray-300 hover:bg-gray-50': el !== activeElement,
                }"
                @click="focusElementMobile(el)"
              >
                <UButton
                  :icon="el.visible ? 'i-custom-view' : 'i-custom-hide'"
                  size="xs"
                  :color="el.visible ? 'primary' : 'neutral'"
                  variant="ghost"
                  class="flex-shrink-0"
                  @click.stop="el.visible = !el.visible"
                />

                <div class="flex items-center space-x-2 flex-1 min-w-0">
                  <div
                    v-if="isSVGString(el.thumbnail)"
                    class="thumbnail-mobile flex-shrink-0"
                    v-html="el.thumbnail"
                  />
                  <img v-else class="thumbnail-mobile flex-shrink-0" :src="el.thumbnail">
                  <span class="text-xs font-medium truncate">{{ el.displayName }}</span>
                </div>

                <UButton
                  icon="i-custom-delete"
                  size="xs"
                  color="error"
                  variant="ghost"
                  class="flex-shrink-0"
                  @click.stop="removeElement(el, i)"
                />
              </div>
            </div>
          </template>
        </USlideover>
      </div>

      <!-- 右侧设置区域 - 移动端全宽 -->
      <div class="w-full xl:w-[345px] bg-white rounded-lg shadow-md overflow-x-hidden">
        <div class="h-[300px] xl:h-full xl:max-h-none overflow-y-auto">
          <div v-if="activeElement" class="space-y-4 py-4 px-4 xl:px-6">
            <div v-for="item of activeElement.settings" :key="item.name">
              <label
                class="block text-sm text-gray-600 font-semibold mb-1"
                :class="{ 'inline-block align-middle': item.type === 'checkbox' }"
              >{{
                item.label
              }}</label>
              <UCheckbox
                v-if="item.type === 'checkbox'"
                v-model="(activeElement as any)[item.name]"
                v-bind="item.props"
                size="lg"
                class="inline-block align-middle ml-2"
              />
              <div v-if="item.type !== 'checkbox'" class="mt-1">
                <UInput
                  v-if="item.type === 'input'"
                  v-model="(activeElement as any)[item.name]"
                  v-bind="item.props"
                  size="md"
                />
                <USlider
                  v-if="item.type === 'slider'"
                  v-model="(activeElement as any)[item.name]"
                  v-bind="item.props"
                  :title="(activeElement as any)[item.name]"
                />
                <USelectMenu
                  v-if="item.type === 'font-select'"
                  v-model="(activeElement as any)[item.name]"
                  v-bind="item.props"
                  :items="systemFonts"
                  :search="true"
                  :loading="isLoadingFonts"
                  class="w-full"
                  size="md"
                  @update:model-value="font = $event"
                >
                  <template #item-label="{ item }">
                    <span :style="{ fontFamily: item }">{{ item }}</span>
                  </template>
                </USelectMenu>

                <div v-if="item.type === 'font-style'" class="flex items-center space-x-2">
                  <UTooltip
                    :ui="{
                      text: 'font-semibold text-sm px-2 py-1',
                      arrow: 'fill-white',
                    }"
                    :content="{
                      align: 'center',
                      side: 'top',
                    }"
                    arrow
                    text="Bold"
                  >
                    <UButton
                      size="sm"
                      :color="(activeElement as any)[item.name].bold ? 'primary' : 'neutral'"
                      :variant="(activeElement as any)[item.name].bold ? 'solid' : 'outline'"
                      class="w-[36px] h-[36px] flex-1"
                      @click="(activeElement as any)[item.name].bold = !(activeElement as any)[item.name].bold"
                    >
                      <span
                        class="font-bold inline-block align-middle w-[18px] leading-[18px] mx-auto"
                        style="font-family: 'Times New Roman'; font-size: 16px"
                      >B</span>
                    </UButton>
                  </UTooltip>
                  <UTooltip
                    :ui="{
                      text: 'font-semibold text-sm px-2 py-1',
                      arrow: 'fill-white',
                    }"
                    :content="{
                      align: 'center',
                      side: 'top',
                    }"
                    arrow
                    text="italic"
                  >
                    <UButton
                      size="sm"
                      :color="(activeElement as any)[item.name].italic ? 'primary' : 'neutral'"
                      :variant="(activeElement as any)[item.name].italic ? 'solid' : 'outline'"
                      class="w-[36px] h-[36px] flex-1"
                      @click="(activeElement as any)[item.name].italic = !(activeElement as any)[item.name].italic"
                    >
                      <span
                        class="italic inline-block align-middle w-[18px] leading-[18px] mx-auto"
                        style="font-family: 'Times New Roman'; font-size: 16px"
                      >I</span>
                    </UButton>
                  </UTooltip>
                  <UTooltip
                    :ui="{
                      text: 'font-semibold text-sm px-2 py-1',
                      arrow: 'fill-white',
                    }"
                    :content="{
                      align: 'center',
                      side: 'top',
                    }"
                    arrow
                    text="whiten"
                  >
                    <UButton
                      size="sm"
                      :color="(activeElement as any)[item.name].whiten ? 'primary' : 'neutral'"
                      :variant="(activeElement as any)[item.name].whiten ? 'solid' : 'outline'"
                      class="w-[36px] h-[36px] flex-1"
                      @click="(activeElement as any)[item.name].whiten = !(activeElement as any)[item.name].whiten"
                    >
                      <SvgWhitenn
                        v-if="(activeElement as any)[item.name].whiten"
                        width="18"
                        height="18"
                        class="mx-auto"
                      />
                      <SvgWhiten
                        v-else
                        width="18"
                        height="18"
                        class="mx-auto"
                      />
                    </UButton>
                  </UTooltip>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 移动端滚动提示 -->
        <div v-if="activeElement && activeElement.settings.length > 4" class="xl:hidden flex items-center justify-center mt-3 py-2 border-t border-gray-100">
          <div class="flex items-center space-x-2 text-gray-400 bg-gray-50 px-3 py-1.5 rounded-full">
            <SvgScroll class="size-4" />
            <span class="text-xs font-medium">Scroll to see more</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 移动端元素选择弹窗 -->
  <UModal
    v-model:open="mobileElementDialog"
    :ui="{
      content: 'max-w-sm',
      body: 'w-full !py-4 px-4 h-[60vh] max-h-[500px]',
    }"
  >
    <template #header>
      <div class="text-lg font-semibold">
        Add {{ currentElementType }}
      </div>
    </template>
    <template #body>
      <div class="flex flex-col h-full">
        <!-- 移动端图片类型筛选 -->
        <div v-if="currentElementType === ElementAs.Image" class="mb-4 flex-shrink-0">
          <div class="text-sm font-semibold text-gray-700 mb-2">
            Image Type:
          </div>
          <div class="relative">
            <div class="overflow-x-auto">
              <div class="flex space-x-2 pb-2">
                <div
                  v-for="imageType in imageTypes"
                  :key="imageType.value"
                  class="text-xs text-gray-600 font-medium whitespace-nowrap cursor-pointer select-none px-2 py-1 rounded-full border transition-colors flex-shrink-0"
                  :class="{
                    'border-primary bg-primary text-white': selectedImageType === imageType.value,
                    'border-gray-200 hover:bg-gray-100': selectedImageType !== imageType.value,
                  }"
                  @click="selectedImageType = imageType.value"
                >
                  {{ imageType.label }}
                </div>
              </div>
            </div>
            <!-- 右侧渐变遮罩 -->
            <div class="absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-white to-transparent pointer-events-none" />
          </div>
        </div>

        <!-- 内容区域 - 可滚动 -->
        <div class="flex-1 overflow-y-auto">
          <div class="grid grid-cols-3 gap-3 place-items-center">
            <template v-if="currentElementType === ElementAs.Image">
              <div
                v-for="(src, idx) of filteredImagePresets"
                :key="idx"
                class="flex items-center justify-center w-16 h-16 border-1 rounded cursor-pointer hover:bg-slate-50"
                @click="addImageElement(src); mobileElementDialog = false"
              >
                <img class="w-[80%] h-[80%] object-contain" :src="src">
              </div>
            </template>
            <template v-else>
              <div
                v-for="(El, idx) of groupedElementCtors[currentElementType]"
                :key="idx"
                class="flex items-center justify-center w-16 h-16 border-1 rounded cursor-pointer hover:bg-slate-50"
                @click="addElement(new El()); mobileElementDialog = false"
                v-html="El.thumbnail"
              />
            </template>
          </div>
        </div>

        <!-- 上传按钮 - 固定在底部 -->
        <div v-if="currentElementType === ElementAs.Image" class="mt-4 flex-shrink-0">
          <label
            for="mobile-file"
            role="button"
            class="flex items-center justify-center h-10 w-full rounded-md bg-gray-200 hover:bg-gray-300 text-black font-medium text-sm"
          >
            <el-icon :size="16"><Upload /></el-icon>
            <span class="ml-1">Upload</span>
          </label>
          <input
            id="mobile-file"
            class="hidden"
            type="file"
            accept=".png,.webp,.svg"
            @change="addCustomImage"
          >
        </div>
      </div>
    </template>
  </UModal>

  <UModal
    v-model:open="templatesDialog"
    :ui="{
      content: 'max-w-5xl md:max-w-5xl sm:max-w-full sm:mx-4',
      body: 'w-full !py-2 px-3 sm:px-3 h-[70vh] max-h-[600px] overflow-y-hidden',
    }"
  >
    <template #header>
      <div class="flex items-center justify-between w-full gap-2 sm:gap-4">
        <!-- 标题 -->
        <div class="text-lg font-semibold flex-shrink-0">
          Templates
        </div>

        <!-- 中间：形状选择器 -->
        <div class="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <div class="text-l text-gray-600 font-bold hidden sm:block">
            Choose shape:
          </div>
          <div class="flex items-center space-x-4 sm:space-x-6">
            <UButton
              color="neutral"
              variant="ghost"
              class="w-[48px] sm:w-[52px] cursor-pointer h-[48px] sm:h-[52px] p-0 flex items-center justify-center relative"
              :class="{ 'shape-selected': selectedShape === 'circle' }"
              @click="selectedShape = 'circle'"
            >
              <SvgRound />
              <!-- 下划线指示器 -->
              <div
                v-if="selectedShape === 'circle'"
                class="absolute bottom-[-5px] sm:bottom-[-2px] left-1/2 transform -translate-x-1/2 w-[130%] h-0.5 bg-primary rounded-full"
              />
            </UButton>
            <UButton
              color="neutral"
              variant="ghost"
              class="w-[40px] sm:w-[42px] cursor-pointer h-[40px] sm:h-[42px] p-0 flex items-center justify-center relative"
              :class="{ 'shape-selected': selectedShape === 'square' }"
              @click="selectedShape = 'square'"
            >
              <SvgQuare />
              <!-- 下划线指示器 -->
              <div
                v-if="selectedShape === 'square'"
                class="absolute bottom-[-10px] sm:bottom-[-8px] left-1/2 transform -translate-x-1/2 w-[130%] h-0.5 bg-primary rounded-full"
              />
            </UButton>

            <UButton
              color="neutral"
              variant="ghost"
              class="w-[50px] sm:w-[52px] cursor-pointer h-[50px] sm:h-[52px] p-0 flex items-center justify-center relative"
              :class="{ 'shape-selected': selectedShape === 'triangle' }"
              @click="selectedShape = 'triangle'"
            >
              <SvgTrianglef />
              <!-- 下划线指示器 -->
              <div
                v-if="selectedShape === 'triangle'"
                class="absolute bottom-[-5px] sm:bottom-[-2px] left-1/2 transform -translate-x-1/2 w-[130%] h-0.5 bg-primary rounded-full"
              />
            </UButton>
          </div>
        </div>

        <!-- 右侧：返回按钮 -->
        <UButton
          trailing-icon="i-lucide-arrow-right"
          size="md"
          class="cursor-pointer flex-shrink-0"
          @click="templatesDialog = false"
        >
          <span class="hidden sm:inline">Back edit</span>
          <span class="sm:hidden">Back</span>
        </UButton>
      </div>
    </template>
    <template #body>
      <!-- 主要内容区域 - 响应式布局 -->
      <div class="flex flex-col lg:flex-row lg:items-start h-full lg:space-y-0 overflow-x-hidden">
        <!-- 印章类型列表 - 移动端改为水平滚动 -->
        <div class="w-full lg:w-[180px] lg:h-full flex-shrink-0">
          <!-- 移动端：水平滚动 -->
          <div class="lg:hidden mb-4 -mx-6 px-6">
            <div class="relative">
              <div ref="stampTypeScrollRef" class="overflow-x-auto overflow-y-auto">
                <div class="flex space-x-2 px-1 pb-2 min-w-max">
                  <div
                    v-for="stampType in stampTypes"
                    :key="stampType"
                    class="text-xs text-gray-600 font-semibold whitespace-nowrap cursor-pointer select-none px-3 py-2 rounded-full border transition-colors flex-shrink-0"
                    :class="{
                      'border-primary bg-primary text-white': selectedStampType === stampType,
                      'border-gray-200 hover:bg-gray-100': selectedStampType !== stampType,
                    }"
                    @click="selectStampType(stampType)"
                  >
                    {{ stampType }}
                  </div>
                </div>
              </div>
              <!-- 右侧渐变遮罩 -->
              <div class="absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-white to-transparent pointer-events-none" />
            </div>
          </div>

          <!-- 桌面端：垂直列表 -->
          <div class="hidden lg:block h-full stamp-list overflow-y-auto py-2 px-1 max-h-[550px]">
            <ul>
              <li
                v-for="stampType in stampTypes"
                :key="stampType"
                class="text-center py-3 text-sm px-1 font-semibold cursor-pointer text-gray-600 rounded transition-colors"
                :class="{
                  'bg-primary text-white': selectedStampType === stampType,
                  'hover:bg-gray-50': selectedStampType !== stampType,
                }"
                @click="selectStampType(stampType)"
              >
                {{ stampType }}
              </li>
            </ul>
          </div>
        </div>

        <!-- 模板网格 -->
        <div class="flex-1 lg:h-full overflow-y-auto overflow-x-hidden lg:ml-4">
          <div class="flex flex-wrap h-[500px] px-3 lg:px-6 justify-start content-start" style="gap: 1rem;">
            <div
              v-for="(template, key) of filteredTemplates"
              :key="key"
              class="w-22 h-22 sm:w-38 sm:h-38 lg:w-43 lg:h-43 flex-shrink-0 flex justify-center items-center cursor-pointer hover:bg-slate-50 rounded-lg border border-gray-100"
              @click="chooseTemplate(template)"
            >
              <img
                class="w-full h-full object-contain p-2"
                :style="{
                  transform: `scale(${template.scale || 1})`,
                }"
                :src="templateImgs[key.replace('.json', '.png')]"
              >
            </div>
          </div>
        </div>
      </div>
    </template>
  </UModal>

  <div class="flex justify-center m-2">
    <UButton
      size="md"
      color="primary"
      variant="solid"
      class="px-8 py-3 cursor-pointer
              bg-gradient-to-r from-blue-600 to-purple-600
              hover:from-blue-700 hover:to-purple-700
              text-white font-bold text-base
              shadow-lg hover:shadow-xl
              transform hover:scale-105 hover:-translate-y-1
              transition-all duration-300 ease-out
              border-0
              rounded-xl"
      @click="handleDownload"
    >
      <span class="flex items-center space-x-2">
        <!-- 下载图标放在左边 -->
        <svg
          t="1750033438052"
          class="w-5 h-5"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2324"
        ><path d="M544.256 605.184l244.224-244.224a31.744 31.744 0 0 1 45.056 45.056l-295.424 295.424a36.864 36.864 0 0 1-51.2 0L190.464 406.528a31.744 31.744 0 1 1 45.056-45.056l244.224 244.224V111.104a32.256 32.256 0 1 1 64 0zM153.6 902.656a32.256 32.256 0 0 1 0-64h716.8a32.256 32.256 0 0 1 0 64z" fill="#ffffff" p-id="2325" /></svg>
        <!-- 文案放在右边 -->
        <span>Download</span>
      </span>
    </UButton>
  </div>

  <UModal
    v-model:open="showPaymentDialog"
    :ui="{
      content: 'mt-0 ease-out transition-all sm:max-w-4xl w-full max-w-[95%] m-3 sm:mx-auto',
    }"
  >
    <template #content>
      <div class="relative flex flex-col bg-white shadow-lg rounded-xl">
        <div class="absolute top-2 end-2 z-10">
          <button
            type="button"
            class="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
            @click="closePaymentDialog"
          >
            <svg
              class="shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <!-- 两栏布局 - 在小屏幕上堆叠 -->
        <div
          class="flex flex-col md:flex-row max-h-[90vh] md:max-h-[80vh] overflow-auto"
        >
          <!-- 左侧内容 - 在小屏幕上调整内边距和宽度 -->
          <div
            class="py-6 px-4 sm:py-8 sm:px-8 text-center overflow-y-auto md:w-2/5 border-b md:border-b-0 md:border-r border-gray-200"
          >
            <!-- Icon - 在小屏幕上缩小尺寸 -->
            <span
              class="mb-2 inline-flex justify-center items-center size-[46px] sm:size-[56px] rounded-full border-4 border-green-50 bg-green-100 text-green-500"
            >
              <svg
                t="1740982050847"
                class="icon w-9 h-9 sm:w-12 sm:h-12"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="1501"
              >
                <path
                  d="M511.872032 1024a511.872032 511.872032 0 1 1 511.872032-511.872032 511.872032 511.872032 0 0 1-511.872032 511.872032z m-114.147463-310.962259a53.490627 53.490627 0 0 0 75.501125 0l323.247188-323.247189a53.490627 53.490627 0 0 0-75.501125-76.780804L433.043739 597.610597l-127.968008-127.968008a53.490627 53.490627 0 1 0-76.780805 75.501125z"
                  fill="#41CC8B"
                  p-id="1502"
                />
              </svg>
            </span>

            <ul class="mt-3 sm:mt-5 space-y-2 sm:space-y-3 text-xs sm:text-sm text-left">
              <li class="flex gap-x-2">
                <svg
                  class="shrink-0 mt-0.5 size-3 sm:size-4 text-blue-600 dark:text-blue-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span class="text-gray-800">
                  <b>PROMO:<span>1.99 $</span></b></span>
              </li>

              <li class="flex gap-x-2">
                <svg
                  class="shrink-0 mt-0.5 size-3 sm:size-4 text-blue-600 dark:text-blue-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span class="text-gray-800">
                  <b>PNG+SVG+PDF+DOCX</b>
                </span>
              </li>

              <li class="flex gap-x-2">
                <svg
                  class="shrink-0 mt-0.5 size-3 sm:size-4 text-blue-600 dark:text-blue-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span class="text-gray-800 font-bold">
                  High Quality
                </span>
              </li>
              <li class="flex gap-x-2">
                <svg
                  class="shrink-0 mt-0.5 size-3 sm:size-4 text-blue-600 dark:text-blue-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span class="text-gray-800 font-bold">
                  Transparent background & HD images
                </span>
              </li>
              <li class="flex gap-x-2">
                <svg
                  class="shrink-0 mt-0.5 size-3 sm:size-4 text-blue-600 dark:text-blue-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span class="text-gray-800 font-bold">
                  Scalability
                </span>
              </li>
            </ul>

            <button
              class="mt-4 sm:mt-8 py-2 sm:py-3 px-6 sm:px-10 inline-flex justify-center items-center gap-x-2 text-lg sm:text-base font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700  relative w-full sm:w-auto cursor-pointer"
              @click="onSampleClick"
            >
              Sample
            </button>
          </div>

          <!-- 右侧内容 - 在小屏幕上调整内边距 -->
          <div
            class="py-6 px-4 sm:py-8 sm:px-8 md:w-3/5 flex flex-col justify-center"
          >
            <div class="max-w-md mx-auto">
              <h3
                class="text-lg sm:text-xl font-semibold text-center mb-3 sm:mb-4"
              >
                Specify your E-mail
              </h3>

              <input
                v-if="!emailConfirmed"
                v-model="newUserEmail"
                type="email"
                class="w-full px-3 sm:px-4 py-2 sm:py-3 border-t-0 border-x-0 border-b-2 border-blue-500 focus:outline-none focus:border-blue-700 transition-colors"
                placeholder="your@email.com"
              >

              <div class="mt-4 sm:mt-6 text-gray-700 text-base font-medium">
                <p class="mb-2">
                  After payment, the seal will automatically download in the top-right corner of your browser
                  <svg
                    class="w-4 h-4 sm:w-6 sm:h-6 inline-block"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M19 9h-4V3H9v6H5l7 7 7-7zm-8 2V5h2v6h1.17L12 13.17 9.83 11H11zm-6 7h14v2H5v-2z"
                    />
                  </svg>
                </p>
                <p class="mb-2">
                  Also, the download link will be sent to your specified email: <b>{{ newUserEmail }}</b>
                </p>
              </div>

              <div class="mt-4 sm:mt-8 flex justify-center">
                <!-- 确认邮箱按钮 - 调整尺寸 -->
                <button
                  v-if="!emailConfirmed"
                  class="mt-4 sm:mt-8 py-2 sm:py-3 px-8 sm:px-14 inline-flex justify-center items-center gap-x-2 text-lg sm:text-base font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none relative w-full sm:w-auto cursor-pointer"
                  :disabled="!isValidEmail || downloadLoading"
                  @click="confirmSave"
                >
                  <span
                    v-if="downloadLoading"
                    class="absolute left-1/2 transform -translate-x-1/2"
                  >
                    <svg
                      class="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      />
                      <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                  </span>
                  <span :class="{ 'opacity-0': downloadLoading }" class="font-semibold">Confirm Email</span>
                </button>

                <!-- 去支付按钮 - 调整尺寸 -->
                <a
                  v-if="emailConfirmed && paymentUrl"
                  class="mt-4 sm:mt-8 py-2 sm:py-3 px-8 sm:px-14 inline-flex justify-center items-center gap-x-2 text-xs sm:text-sm font-medium rounded-lg border border-transparent bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:bg-green-700  transition-all duration-300 shadow-md hover:shadow-lg w-full sm:w-auto cursor-pointer"
                  :href="paymentUrl"
                  target="_blank"
                  @click="closePaymentDialog"
                >
                  <svg
                    class="w-4 h-4 sm:w-5 sm:h-5 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                    <path
                      fill-rule="evenodd"
                      d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Pay $1.99
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </UModal>

  <UModal v-model:open="showConfirmModal" title="Warning">
    <template #body>
      <div class="text-lg py-3">
        Your progress will be lost. Proceed?
      </div>
    </template>

    <template #footer>
      <div class="flex justify-end gap-3 w-full">
        <UButton
          color="neutral"
          variant="outline"
          @click="showConfirmModal = false"
        >
          Cancel
        </UButton>
        <UButton
          color="error"
          @click="handleConfirm"
        >
          Proceed
        </UButton>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch, computed } from 'vue'
import {
  Upload,
} from '@element-plus/icons-vue'
import { groupBy } from 'lodash-es'
import type { default as P5, Renderer } from 'p5'
import C2S from 'canvas2svg'
import { StampElement, ElementAs, TextElement } from './elements/base'
import * as elementCtors from './elements'
import { hex2rgb, isSVGString } from './elements/utils'
import SvgWhiten from './img/whiten.svg'
import SvgWhitenn from './img/whitenn.svg'
import SvgScroll from './img/scroll.svg'
import SvgQuare from './img/squaref.svg'
import SvgTrianglef from './img/trianglef.svg'
import SvgRound from './img/round.svg'

import { AgingEffect } from './effect'
import AsyncTask from '@/utils/async-task'
import { frontDownload } from '@/utils/common'
import { getBasicFonts, getSystemFonts } from '~/utils/fontUtils'

// C2S.prototype.scale = function () {} // 不需要处理缩放
C2S.prototype.clearRect = function () {} // 会绘制一个白色的矩形，不需要
C2S.prototype.setLineDash = function (dash: [number, number]) {
  this.__currentElement.setAttribute('stroke-dasharray', dash.join(' '))
}

interface StampConfig {
  primaryColor: string
  aging: AgingEffect
}

interface StampTemplate extends StampConfig {
  elements: object[]
  stampType?: string
  shape?: 'square' | 'triangle' | 'circle'
  scale?: number
  id?: string
  alt?: string
  name?: string
  title?: string
}

const imagePresets = Object.values(
  import.meta.glob('./img/presets/*/**', {
    eager: true,
    import: 'default',
    query: '?url&no-inline',
  }),
) as string[]

const templates = import.meta.glob('./templates/*.json', {
  eager: true,
  import: 'default',
}) as Record<string, StampTemplate>
console.log('🚀 ~ templates:', templates)
const templateImgs = import.meta.glob('./templates/*.png', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const STORAGE_SNAPSHOT = 'stamp_snapshot'
const CANVAS_SIZE = 500

const templatesDialog = ref(false)
const canvasLoading = ref(true)
const canvasProgress = ref(0)

const mainCanvas = ref<HTMLCanvasElement | null>(null)
let mainCtx: CanvasRenderingContext2D
let watermarkCanvas: HTMLCanvasElement | undefined
let watermarkCanvas2: HTMLCanvasElement | undefined
let p5Renderer: Renderer
let c2sTask: AsyncTask | undefined // canvas-to-svg task
let _drawingContext: any

let downloadCanvas: HTMLCanvasElement
let downloadCtx: CanvasRenderingContext2D

const systemFonts = ref(getBasicFonts())
const isLoadingFonts = ref(false)

let font: string = ''

const stampConfig = reactive<StampConfig>({
  primaryColor: '#1b49ac',
  aging: new AgingEffect(),
})

const groupedElementCtors = groupBy(
  Object.values(elementCtors),
  Element => Element.as,
)

const handleAgingEffect = (intensity: number) => {
  stampConfig.aging.enable = true
  stampConfig.aging.intensity = intensity
  stampConfig.aging.refresh()
}

const stampElements = ref<StampElement[]>([])
const activeElement = ref<StampElement>()
let highlightElement: StampElement | null

const stampTypeScrollRef = ref<HTMLElement | null>(null)

watch(stampElements, () => stampConfig.aging.refresh(), { deep: true })

const addElement = (el: StampElement) => {
  if (el instanceof TextElement && font) {
    el.font = font
  }
  stampElements.value.unshift(el)
  activeElement.value = stampElements.value[0]
}

const addImageElement = async (src: string) => {
  canvasLoading.value = true
  if (/\.svg(\?.+)?$/.test(src)) {
    src = await fetch(src).then(res => res.text())
  }
  const img = await elementCtors.Image.createImage(src).finally(
    () => (canvasLoading.value = false),
  )
  addElement(img)
}

const addCustomImage = async (e: any) => {
  const file: File = e.target.files[0]
  e.target.value = ''
  if (!file.type.startsWith('image')) {
    return ElMessage.error('Only images are allowed.')
  }
  let src = URL.createObjectURL(file)
  if (file.type === 'image/svg+xml') {
    src = await fetch(src).then(res => res.text())
  }
  addImageElement(src)
}

const removeElement = (el: StampElement, idx: number) => {
  stampElements.value.splice(idx, 1)
  if (el === activeElement.value) {
    activeElement.value
      = stampElements.value[idx]
        || stampElements.value[stampElements.value.length - 1]
  }
  if (el === highlightElement) {
    highlightElement = null
  }
}

const focusElement = (el: StampElement) => {
  activeElement.value = el
  highlightElement = null
}

const reset = async () => {
  if (!stampElements.value.length) return
  const confirmed = await showConfirmDialog()
  if (confirmed) {
    stampElements.value = []
    activeElement.value = undefined
  }
}

// p5.js sketch
const initSketch = () => {
  window.setup = () => {
    p5Renderer = createCanvas(CANVAS_SIZE, CANVAS_SIZE)
    p5Renderer.elt.remove()
    textAlign(CENTER)
    rectMode(CENTER)
    const canvas = mainCanvas.value!
    downloadCanvas = document.createElement('canvas')
    canvas.width = downloadCanvas.width = p5Renderer.elt.width
    canvas.height = downloadCanvas.height = p5Renderer.elt.height
    mainCtx = canvas.getContext('2d')!
    downloadCtx = downloadCanvas.getContext('2d')!
    _drawingContext = drawingContext
  }
  window.draw = () => {
    clear(), noFill()
    ;[...stampElements.value].reverse().forEach((el) => {
      const hexColor
        = !highlightElement || highlightElement === el
          ? stampConfig.primaryColor
          : '#d9d9d9'
      const [r, g, b] = hex2rgb(hexColor)
      el.render(r, g, b)
    })
    c2sTask?.done()
    stampConfig.aging.apply(_drawingContext)

    const canvas = mainCanvas.value!
    mainCtx.clearRect(0, 0, canvas.width, canvas.height)
    mainCtx.drawImage(p5Renderer.elt, 0, 0)
    if (!watermarkCanvas) {
      watermarkCanvas = watermark()
    }
    mainCtx.drawImage(watermarkCanvas, 0, 0)
  }
  new (p5 as any)()
}

onMounted(async () => {
  // 开始Canvas loading动画
  const progressTimer = setInterval(() => {
    if (canvasProgress.value < 90) {
      canvasProgress.value += Math.random() * 15 + 5
    }
  }, 100)

  try {
    initSketch()
    loadSystemFonts()

    if (!loadTemplateFromStorage()) {
      const t = Object.values(templates)[0]
      t && loadTemplate(t)
    }
    activeElement.value = stampElements.value[0]

    // 完成进度并延迟2秒隐藏loading
    canvasProgress.value = 100
    clearInterval(progressTimer)

    setTimeout(() => {
      canvasLoading.value = false
    }, 2000) // 2秒后隐藏loading
  } catch (error) {
    console.error('Canvas loading failed:', error)
    clearInterval(progressTimer)
    canvasLoading.value = false
  }
})

onBeforeUnmount(() => {
  saveTemplateToStorage()
  p5.instance?.remove()
})

const canvas2svg = async () => {
  const size = CANVAS_SIZE * pixelDensity()
  const ctx = new C2S(size, size)
  ctx.getSvg().removeAttribute('width')
  ctx.getSvg().removeAttribute('height')
  ctx.getSvg().setAttribute('viewBox', `0 0 ${size} ${size}`)
  if (!stampConfig.aging.enable) {
    p5Renderer.drawingContext = window.drawingContext = new Proxy(
      drawingContext,
      {
        get(target, propKey) {
          const res = Reflect.get(target, propKey)
          return typeof res === 'function'
            ? new Proxy(res, {
              apply(target2, thisArg, args) {
                jobs.push(() => ctx[propKey]?.apply(ctx, args))
                return Reflect.apply(target2, target, args)
              },
            })
            : res
        },
        set(target, propKey, value) {
          jobs.push(() => (ctx[propKey] = value))
          return Reflect.set(target, propKey, value)
        },
      },
    )

    const jobs: (() => void)[] = []
    c2sTask = new AsyncTask()
    await c2sTask.promise
    p5Renderer.drawingContext = window.drawingContext = _drawingContext
    jobs.forEach(job => job())
  }
  else {
    // svg不支持做旧效果
    ctx.drawImage(p5Renderer.elt, 0, 0)
  }
  return ctx.getSerializedSvg() as string
}

// 编辑时的文字水印
const watermark = () => {
  const canvas = document.createElement('canvas'),
    W = CANVAS_SIZE * pixelDensity(),
    H = W
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')!
  // 设置水印样式
  ctx.globalAlpha = 0.1 // 水印透明度
  ctx.fillStyle = '#999'
  ctx.font = '32px Arial'

  // 计算水印文本
  const text = 'stampdy.com' // 替换为你的水印文本
  const textWidth = ctx.measureText(text).width

  // 旋转画布并绘制多个水印
  ctx.translate(W / 2, H / 2)
  ctx.rotate(-Math.PI / 4) // 45度角旋转
  ctx.scale(pixelDensity(), pixelDensity())

  // 绘制水印网格
  for (let i = -W; i < W; i += textWidth + 60) {
    for (let j = -H; j < H; j += 120) {
      ctx.fillText(text, i, j)
    }
  }
  return canvas
}

// 免费下载时的马赛克水印
const watermark2 = () => {
  const canvas = document.createElement('canvas'),
    H = CANVAS_SIZE * pixelDensity(),
    W = H / 2,
    w = ~~(H / 25)
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')!
  // 设置水印样式
  // ctx.globalAlpha = 0.85 // 水印透明度
  // ctx.fillStyle = stampConfig.primaryColor

  // 绘制水印网格
  for (let i = 0, x = Math.ceil(W / w); i < x; i++) {
    for (let j = 0, y = Math.ceil(H / w); j < y; j++) {
      if ((i + j) % 2) {
        ctx.fillRect(i * w, j * w, w, w)
      }
    }
  }
  return canvas
}

const exportFreePNG = (download = true) => {
  downloadCtx.clearRect(0, 0, downloadCanvas.width, downloadCanvas.height)
  downloadCtx.drawImage(p5Renderer.elt, 0, 0)
  if (!watermarkCanvas2) {
    watermarkCanvas2 = watermark2()
  }
  downloadCtx.drawImage(watermarkCanvas2, 0, 0)
  const dataURL = downloadCanvas.toDataURL('image/png')
  download && frontDownload(dataURL, 'stamp')
  return dataURL
}

const exportPNG = (download = true) => {
  const dataURL = p5Renderer.elt.toDataURL('image/png')
  download && frontDownload(dataURL, 'stamp')
  return dataURL
}

const exportSVG = async (download = true) => {
  const svg = await canvas2svg()
  if (download) {
    frontDownload(
      URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' })),
      'stamp',
    )
  }
  return svg
}

// 加载系统字体
const loadSystemFonts = async () => {
  isLoadingFonts.value = true
  systemFonts.value = await getSystemFonts()
  isLoadingFonts.value = false
}

const chooseTemplate = (template: StampTemplate) => {
  console.log('🚀 ~ chooseTemplate ~ template:', template)
  loadTemplate(template)
  templatesDialog.value = false
  activeElement.value = stampElements.value[0]
  stampConfig.aging.enable = false
  stampConfig.aging.intensity = 0
  stampConfig.aging.refresh()
}

// 加载模板
const loadTemplate = (template: StampTemplate) => {
  stampConfig.primaryColor = template.primaryColor
  stampElements.value = template.elements
    .map(el => StampElement.fromJSON(JSON.stringify(el)))
    .filter(Boolean as any)
}

// 保存模板列表到本地存储
const saveTemplateToStorage = () => {
  localStorage.setItem(STORAGE_SNAPSHOT, getSnapshot())
}

// 从本地存储加载模板列表
const loadTemplateFromStorage = () => {
  const snapshot = localStorage.getItem(STORAGE_SNAPSHOT)
  if (snapshot) {
    loadTemplate(JSON.parse(snapshot))
  }
  return snapshot
}

const getSnapshot = (minify = true) =>
  JSON.stringify(
    {
      primaryColor: stampConfig.primaryColor,
      elements: stampElements.value,
    },
    null,
    minify ? 0 : 2,
  )

const exportTemplate = () => {
  const name = `seal_${Date.now()}`
  const blob = new Blob([getSnapshot(false)], { type: 'application/json' })
  frontDownload(URL.createObjectURL(blob), name)
  frontDownload(p5Renderer.elt.toDataURL('image/png'), name)
}

defineExpose({
  exportFreePNG,
  exportPNG,
  exportSVG,
  exportTemplate,
  chooseTemplate,
  get canvas() {
    return p5Renderer.elt
  },
})

const mobileElementDialog = ref(false)
const currentElementType = ref<string>('')
const mobileElementListOpen = ref(false)

const showMobileElementPanel = (elementType: string) => {
  currentElementType.value = elementType
  mobileElementDialog.value = true
}

// 添加移动端元素点击处理函数
const focusElementMobile = (el: StampElement) => {
  focusElement(el)
  highlightElement = el
}

// 监听移动端面板关闭，重置高亮
watch(mobileElementListOpen, (newValue) => {
  if (!newValue) {
    highlightElement = null
  }
})

// 添加形状选择状态
const selectedShape = ref<'square' | 'triangle' | 'circle'>('circle') // 默认选中圆形
const selectedStampType = ref<string>('All') // 默认选中所有类型

// 印章类型列表
const stampTypes = [
  'All', 'India seals', 'Company seals', 'Design seals', 'Custom stamps',
  'Bank stamps', 'Medical stamps', 'Businness stamps', 'Wedding stamps',
  'Justice stamps', 'Notary stamps', 'Library seal', 'Rubber Stamp',
  'Government seal', 'Corporate stamps', 'Stamp received', 'School stamp',
  'Text stamp', 'Date stamp', 'Logo stamp', 'Red stamp', 'Square seal',
  'Chinese seal', 'Deposit only stamp', 'Address stamp',
]

// 图片类型列表
const imageTypes = [
  { value: 'All', label: 'All' },
  { value: 'Architecture', label: 'Architecture' },
  { value: 'Business finance', label: 'Business finance' },
  { value: 'Food', label: 'Food' },
  { value: 'Drinks', label: 'Drinks' },
  { value: 'Medicine', label: 'Medicine' },
  { value: 'Science,Studies', label: 'Science, Studies' },
  { value: 'Recreation,Entertainment', label: 'Recreation, Entertainment' },
  { value: 'Law,Economics', label: 'Law, Economics' },
  { value: 'Religion', label: 'Religion' },
  { value: 'Agriculture,Construction', label: 'Agriculture, Construction' },
  { value: 'Communication', label: 'Communication' },
  { value: 'Sport', label: 'Sport' },
  { value: 'Engineering,Subjects', label: 'Engineering, Subjects' },
  { value: 'Transport', label: 'Transport' },
  { value: 'Tourism,Travels', label: 'Tourism, Travels' },
  { value: 'Fauna', label: 'Fauna' },
  { value: 'Flora', label: 'Flora' },
  { value: 'Elements of decoration', label: 'Elements of decoration' },
  { value: 'People', label: 'People' },
]

const selectedImageType = ref<string>('All') // 默认选中所有图片类型

// 从图片路径中提取分类名的辅助函数
const extractImageCategory = (imagePath: string): string | null => {
  const match = imagePath.match(/\/presets\/([^\/]+)\//)
  return match ? match[1] : null
}

// 过滤后的图片预设
const filteredImagePresets = computed(() => {
  if (selectedImageType.value === 'All') {
    return imagePresets
  }

  return imagePresets.filter((preset: string) => {
    const categoryFromPath = extractImageCategory(preset)
    return categoryFromPath === selectedImageType.value
  })
})

// 过滤后的模板列表
const filteredTemplates = computed(() => {
  const templateEntries = Object.entries(templates)

  return templateEntries.filter(([_, template]) => {
    // 形状过滤
    const shapeMatch = !template.shape || template.shape === selectedShape.value

    // 类型过滤
    const typeMatch = selectedStampType.value === 'All'
      || !template.stampType
      || template.stampType === selectedStampType.value

    return shapeMatch && typeMatch
  }).reduce((acc, [key, template]) => {
    acc[key] = template
    return acc
  }, {} as Record<string, StampTemplate>)
})

// 选择印章类型
const selectStampType = (stampType: string) => {
  selectedStampType.value = stampType
}

// 添加选中状态
const activePopoverType = ref<string>('')

const onSampleClick = () => {
  exportFreePNG()
}

const handleDownload = () => {
  showPaymentDialog.value = true
}

// 关闭支付对话框
const closePaymentDialog = () => {
  showPaymentDialog.value = false
  // 重置状态，以便下次打开对话框时重新确认邮箱
  emailConfirmed.value = false
  paymentUrl.value = ''
}

const emailConfirmed = ref(false)
const paymentUrl = ref('')
const downloadLoading = ref(false)
const newUserEmail = ref('')

// 验证邮箱有效性
const isValidEmail = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(newUserEmail.value)
})

const showPaymentDialog = ref(false)

const confirmSave = async () => {
  // exportFreePNG()

  if (isValidEmail.value) {
    downloadLoading.value = true

    const response = await $fetch('/api/stripe/create-payment-link', {
      method: 'POST',
      body: {
        userEmail: newUserEmail.value,
      },
    })
    console.log('🚀 ~ confirmSave ~ response:', response)
    downloadLoading.value = false
    if (response.success) {
    // 发送请求到后端确认邮箱
    // 后端返回支付链接
      paymentUrl.value = response.url
      // showPaymentDialog.value = true
    }
  }
}

const showConfirmModal = ref(false)
let confirmResolve: ((value: boolean) => void) | null = null

// 创建确认对话框函数
const showConfirmDialog = (): Promise<boolean> => {
  return new Promise((resolve) => {
    confirmResolve = resolve
    showConfirmModal.value = true
  })
}

const handleConfirm = () => {
  showConfirmModal.value = false
  if (confirmResolve) {
    confirmResolve(true)
    confirmResolve = null
  }
}

// 监听 Modal 关闭事件（点击外部或按 ESC）
watch(showConfirmModal, (newVal) => {
  if (!newVal && confirmResolve) {
    confirmResolve(false)
    confirmResolve = null
  }
})
</script>

<style scoped>
.el-icon {
  font-size: 14px;
}

.el-btn-active {
  background-color: var(--el-button-hover-bg-color);
  border-color: var(--el-button-hover-border-color);
  color: var(--el-button-hover-text-color);
  outline: none;
}

.thumbnail {
  width: 24px;
}

.thumbnail-svg :deep(svg g){
      transform: scale(1);
}
.thumbnail :deep(svg) {
  width: 24px;
  height: auto;
}
.thumbnail :deep([stroke]) {
  stroke: currentColor;
}
.thumbnail :deep([fill]:not([fill='none'])) {
  fill: currentColor;
}

.bg-grid-slate-100 {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='%23ccc'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
}

.stamp-list{
  ul li{
    border-bottom: 1px solid #e0e0e0;
  }
}

/* 自定义滚动条样式 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

.thumbnail-mobile {
  width: 20px;
  height: 20px;
}
.thumbnail-mobile :deep(svg) {
  width: 20px;
  height: 20px;
}
.thumbnail-mobile :deep([stroke]) {
  stroke: currentColor;
}
.thumbnail-mobile :deep([fill]:not([fill='none'])) {
  fill: currentColor;
}

/* 移动端优化 */
@media (max-width: 768px) {
  .thumbnail {
    width: 20px;
    height: 20px;
  }
  .thumbnail :deep(svg) {
    width: 20px;
    height: 20px;
  }
}

/* 确保浮动按钮在移动端可见且层级合适 */
@media (max-width: 1279px) {
  .fixed.bottom-4.right-4 {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    z-index: 40;
  }
}

/* Slideover 样式优化 */
:deep(.fixed.bg-default) {
  box-shadow: -4px 0 15px -3px rgba(0, 0, 0, 0.1), -10px 0 20px -2px rgba(0, 0, 0, 0.05);
}

/* 选中状态样式 */
.shape-selected {
  background-color: rgba(59, 130, 246, 0.1); /* 蓝色背景，10%透明度 */
  color: #3b82f6; /* 蓝色文字 */
}

/* 下划线动画效果 */
.shape-selected .absolute {
  animation: slideIn 0.2s ease-out;
}

@keyframes slideIn {
  from {
    width: 0;
    opacity: 0;
  }
  to {
    width: 1.5rem;
    opacity: 1;
  }
}
</style>
