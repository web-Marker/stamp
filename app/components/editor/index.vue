<template>
  <div id="stamp-editor" class="max-w-[1200px] mx-auto border border-gray-200 rounded-lg bg-blue-50 p-2 md:p-4 my-4">
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
                class="cursor-pointer font-semibold w-full md:w-auto"
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

    <!-- 主要内容区域 - 移动端垂直布局 -->
    <div class="flex flex-col xl:flex-row xl:justify-between xl:h-[500px] mt-4 gap-4">
      <!-- 移动端顶部工具栏 -->
      <div class="xl:hidden bg-white rounded-lg shadow-md p-3">
        <div class="flex justify-center space-x-4">
          <UButton
            v-for="(Els, key) of groupedElementCtors"
            :key="key"
            size="sm"
            color="neutral"
            variant="outline"
            class="flex-1 flex flex-row items-center justify-center gap-1 py-2 px-1"
            @click="showMobileElementPanel(key)"
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
          <div class="border-r border-gray-200">
            <div class="text-base font-semibold text-center p-2">
              Add
            </div>
            <USeparator />

            <UPopover
              v-for="(Els, key) of groupedElementCtors"
              :key="key"
              mode="hover"
              arrow
              :content="{
                align: 'center',
                side: 'right',
              }"
            >
              <div
                v-if="key === ElementAs.Image"
                class="p-3 text-center text-sm cursor-pointer font-semibold"
              >
                <UIcon name="i-custom-image" class="size-10" />
                <p>Image</p>
              </div>
              <div
                v-if="key === ElementAs.Shape"
                class="p-3 text-center text-sm cursor-pointer font-semibold"
              >
                <UIcon name="i-custom-shape" class="size-10" />
                <p>Shape</p>
              </div>
              <div
                v-if="key === ElementAs.Text"
                class="p-3 text-center text-sm cursor-pointer font-semibold"
              >
                <UIcon name="i-custom-text" class="size-10" />
                <p>Text</p>
              </div>
              <USeparator />

              <template #content>
                <Placeholder class=" m-4 inline-flex">
                  <div class="h-full flex flex-col">
                    <div class="flex-1 grid grid-cols-3 gap-2">
                      <template v-if="key === ElementAs.Image">
                        <div
                          v-for="(src, idx) of imagePresets"
                          :key="idx"
                          class="flex items-center justify-center w-20 h-20 border-1 rounded cursor-pointer hover:bg-slate-50"
                          @click="addImageElement(src)"
                        >
                          <img class="w-[80%] h-[80%]" :src="src">
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
          <div class="w-[300px]">
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
                      class="thumbnail mx-2"
                      v-html="el.thumbnail"
                    />
                    <img v-else class="thumbnail " :src="el.thumbnail">
                    <span class="flex-1 ellipsis whitespace-nowrap ">{{ el.displayName }}</span>
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
      <div class="relative w-full xl:w-[500px] sm:w-[55%] sm:mx-auto xl:h-auto bg-slate-50 rounded-lg shadow-md overflow-hidden">
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
                  :color="el.visible ? 'primary' : 'gray'"
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
                  color="red"
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
      <div class="w-full xl:w-[280px] bg-white rounded-lg shadow-md overflow-x-hidden">
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
                        class="font-bold inline-block align-middle w-[18px] leading-[18px]"
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
                        class="italic inline-block align-middle w-[18px] leading-[18px]"
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
                      <SvgWhitenn v-if="(activeElement as any)[item.name].whiten" width="18" height="18" />
                      <SvgWhiten v-else width="18" height="18" />
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
      body: 'w-full !py-4 px-4',
    }"
  >
    <template #header>
      <div class="text-lg font-semibold">
        Add {{ currentElementType }}
      </div>
    </template>
    <template #body>
      <div class="grid grid-cols-3 gap-3">
        <template v-if="currentElementType === ElementAs.Image">
          <div
            v-for="(src, idx) of imagePresets"
            :key="idx"
            class="flex items-center justify-center w-16 h-16 border-1 rounded cursor-pointer hover:bg-slate-50"
            @click="addImageElement(src); mobileElementDialog = false"
          >
            <img class="w-[80%] h-[80%]" :src="src">
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
      <div v-if="currentElementType === ElementAs.Image" class="mt-4">
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
    </template>
  </UModal>

  <UModal
    v-model:open="templatesDialog"
    :ui="{
      content: 'max-w-5xl md:max-w-5xl sm:max-w-full sm:mx-4',
      body: 'w-full !py-2 px-6 sm:px-3',
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
          <div class="text-sm text-gray-600 font-semibold hidden sm:block">
            Choose shape:
          </div>
          <div class="flex items-center space-x-1 sm:space-x-2">
            <UButton
              size="xs"
              color="neutral"
              variant="outline"
              class="w-[32px] sm:w-[36px] cursor-pointer h-[32px] sm:h-[36px] p-0 flex items-center justify-center"
            >
              <SvgQuare class="size-4 sm:size-5" />
            </UButton>
            <UButton
              size="xs"
              color="neutral"
              variant="outline"
              class="w-[32px] sm:w-[36px] cursor-pointer h-[32px] sm:h-[36px] p-0 flex items-center justify-center"
            >
              <SvgTrianglef class="size-5 sm:size-6" />
            </UButton>
            <UButton
              size="xs"
              color="neutral"
              variant="outline"
              class="w-[32px] sm:w-[36px] cursor-pointer h-[32px] sm:h-[36px] p-0 flex items-center justify-center"
            >
              <SvgRound class="size-5 sm:size-6" />
            </UButton>
          </div>
        </div>

        <!-- 右侧：返回按钮 -->
        <UButton
          trailing-icon="i-lucide-arrow-right"
          size="sm"
          class="cursor-pointer flex-shrink-0"
          @click="templatesDialog = false"
        >
          <span class="hidden sm:inline">Back edit</span>
          <span class="sm:hidden">Back</span>
        </UButton>
      </div>
    </template>
    <template #body>
      <!-- 行业分类筛选 -->
      <div class="flex w-full items-center justify-center mb-4">
        <div ref="categoryScrollRef" class="w-full mx-2 sm:mx-5 overflow-x-auto">
          <div class="flex space-x-2 sm:space-x-4 py-2 px-1">
            <div
              v-for="(item, index) in ['All', 'Auto-Moto', 'Audio-Video', 'Business', 'Design', 'Home, Family , Kids', 'Animals, Plant', 'Internet', 'Arts, Fashion', 'Computer', 'Medicine', 'Music', 'Science, Studies, Education', 'Rest, Entertainment', 'Law, Economy', 'Religion', 'Agriculture', 'Construction, Real estate', 'Engineering, Technology', 'Tourism, Travel', 'Enthusiasm, Hobby', 'Finances', 'Hoteis, Restaurants', 'Monuments', 'Transport', 'Sport', 'Nature']"
              :key="index"
              class="text-xs text-gray-600 font-semibold whitespace-nowrap cursor-pointer select-none px-3 py-2 rounded-full border border-gray-200 hover:bg-gray-100"
            >
              {{ item }}
            </div>
          </div>
        </div>
        <UButton
          icon="i-custom-rightn"
          size="sm"
          color="neutral"
          variant="outline"
          class="block"
          @click="scrollCategoryList('right')"
        />
      </div>

      <!-- 主要内容区域 - 响应式布局 -->
      <div class="flex flex-col lg:flex-row lg:items-start h-auto lg:h-[500px] space-y-4 lg:space-y-0">
        <!-- 印章类型列表 - 移动端改为水平滚动 -->
        <div class="w-full lg:w-[180px] lg:h-full">
          <!-- 移动端：水平滚动 -->
          <div class="lg:hidden">
            <div class="flex items-center mb-2">
              <div ref="stampTypeScrollRef" class="flex-1 overflow-x-auto">
                <div class="flex space-x-2 px-1 pb-2">
                  <div
                    v-for="stampType in ['India seals', 'Company seals', 'Design seals', 'Custom stamps', 'Bank stamps', 'Medical stamps', 'Businness stamps', 'Wedding stamps', 'Justice stamps', 'Notary stamps', 'Library seal', 'Rubber Stamp', 'Government seal', 'Stamp received', 'School stamp', 'Text stamp', 'Date stamp', 'Logo stamp', 'Red stamp', 'Square seal', 'Chinese seal', 'Deposit only stamp', 'Address stamp']"
                    :key="stampType"
                    class="text-xs text-gray-600 font-semibold whitespace-nowrap cursor-pointer select-none px-3 py-2 rounded-full border border-gray-200 hover:bg-gray-100"
                  >
                    {{ stampType }}
                  </div>
                </div>
              </div>
              <UButton
                icon="i-custom-rightn"
                size="sm"
                color="neutral"
                variant="outline"
                class="ml-2"
                @click="scrollStampTypeList('right')"
              />
            </div>
          </div>

          <!-- 桌面端：垂直列表 -->
          <div class="hidden lg:block h-full stamp-list overflow-y-auto py-2 px-1">
            <ul>
              <li
                v-for="stampType in ['India seals', 'Company seals', 'Design seals', 'Custom stamps', 'Bank stamps', 'Medical stamps', 'Businness stamps', 'Wedding stamps', 'Justice stamps', 'Notary stamps', 'Library seal', 'Rubber Stamp', 'Government seal', 'Stamp received', 'School stamp', 'Text stamp', 'Date stamp', 'Logo stamp', 'Red stamp', 'Square seal', 'Chinese seal', 'Deposit only stamp', 'Address stamp']"
                :key="stampType"
                class="py-3 text-sm px-1 font-semibold cursor-pointer text-gray-600 hover:bg-gray-50 rounded"
              >
                {{ stampType }}
              </li>
            </ul>
          </div>
        </div>

        <!-- 模板网格 -->
        <div class="flex-1 lg:h-full overflow-y-auto">
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 px-2 lg:px-4">
            <div
              v-for="(template, key) of templates"
              :key="key"
              class="flex justify-center items-center aspect-square cursor-pointer hover:bg-slate-50 rounded-lg border border-gray-100"
              @click="chooseTemplate(template)"
            >
              <img
                class="w-full h-full object-contain p-2"
                :src="templateImgs[key.replace('.json', '.png')]"
              >
            </div>
          </div>
        </div>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch } from 'vue'
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
}
const color = ref('#1b49ac')

const colorPresets = ['#1b49ac', '#ff0000', '#00eeee', '#000000', '#c71585']
const imagePresets = Object.values(
  import.meta.glob('./img/*.png', {
    eager: true,
    import: 'default',
    query: '?no-inline',
  }),
) as string[]

const templates = import.meta.glob('./templates/*.json', {
  eager: true,
  import: 'default',
}) as Record<string, StampTemplate>
const templateImgs = import.meta.glob('./templates/*.png', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const STORAGE_SNAPSHOT = 'stamp_snapshot'
const CANVAS_SIZE = 500

const templatesDialog = ref(false)
const canvasLoading = ref(false)

const mainCanvas = ref<HTMLCanvasElement | null>(null)
let mainCtx: CanvasRenderingContext2D
let watermarkCanvas: HTMLCanvasElement | undefined
let p5Renderer: Renderer
let c2sTask: AsyncTask | undefined // canvas-to-svg task
let _drawingContext: any

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

const colorPickerRef = ref<HTMLInputElement | null>(null)
const categoryScrollRef = ref<HTMLElement | null>(null)
const stampTypeScrollRef = ref<HTMLElement | null>(null)

const scrollCategoryList = (direction: 'left' | 'right') => {
  if (!categoryScrollRef.value) return

  const scrollAmount = 200 // 每次滚动的像素数量
  const currentScroll = categoryScrollRef.value.scrollLeft

  if (direction === 'left') {
    categoryScrollRef.value.scrollTo({
      left: Math.max(0, currentScroll - scrollAmount),
      behavior: 'smooth',
    })
  }
  else {
    categoryScrollRef.value.scrollTo({
      left: currentScroll + scrollAmount,
      behavior: 'smooth',
    })
  }
}

const scrollStampTypeList = (direction: 'left' | 'right') => {
  if (!stampTypeScrollRef.value) return

  const scrollAmount = 200 // 每次滚动的像素数量
  const currentScroll = stampTypeScrollRef.value.scrollLeft

  if (direction === 'left') {
    stampTypeScrollRef.value.scrollTo({
      left: Math.max(0, currentScroll - scrollAmount),
      behavior: 'smooth',
    })
  }
  else {
    stampTypeScrollRef.value.scrollTo({
      left: currentScroll + scrollAmount,
      behavior: 'smooth',
    })
  }
}

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
}

const focusElement = (el: StampElement) => {
  activeElement.value = el
  highlightElement = null
}

const reset = async () => {
  if (!stampElements.value.length) return
  await ElMessageBox.confirm(
    '<div class="text-lg py-3">Your progress will be lost. Proceed?</div>',
    {
      type: 'warning',
      dangerouslyUseHTMLString: true,
    },
  )
  stampElements.value = []
  activeElement.value = undefined
}

// p5.js sketch
const initSketch = () => {
  window.setup = () => {
    p5Renderer = createCanvas(CANVAS_SIZE, CANVAS_SIZE)
    p5Renderer.elt.remove()
    textAlign(CENTER)
    rectMode(CENTER)
    const canvas = mainCanvas.value!
    canvas.width = p5Renderer.elt.width
    canvas.height = p5Renderer.elt.height
    mainCtx = canvas.getContext('2d')!
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

onMounted(() => {
  initSketch()
  loadSystemFonts()

  if (!loadTemplateFromStorage()) {
    const t = Object.values(templates)[0]
    t && loadTemplate(t)
  }
  activeElement.value = stampElements.value[0]
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

// 添加水印的方法
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

const exportFreePNG = (download = true) => {
  const dataURL = mainCanvas.value!.toDataURL('image/png')
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
  loadTemplate(template)
  templatesDialog.value = false
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
</style>
