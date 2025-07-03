<template>
  <!-- ========== NAVIGATION BAR ========== -->
  <header class="flex border-b border-gray-200 flex-wrap lg:justify-start lg:flex-nowrap z-50 w-full py-3 shadow-md bg-white">
    <nav class="relative max-w-7xl w-full flex flex-wrap lg:grid lg:grid-cols-12 basis-full items-center px-4 md:px-6 lg:px-8 mx-auto">
      <div class="lg:col-span-3 flex items-center justify-between w-full lg:w-auto">
        <!-- Logo -->
        <NuxtLink :to="getNavLink('/')" class="flex-none rounded-xl text-xl inline-block font-semibold focus:outline-hidden focus:opacity-80">
          <svg
            class="w-20 h-6 sm:w-24 sm:h-8 md:w-28 md:h-10 lg:w-40 lg:h-14"
            viewBox="0 0 262 81"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M128.95 10.0967H138.978V26.3672H135.978V13.0967H24.1387C18.3399 13.0968 13.6389 17.7979 13.6387 23.5967V77.0967H135.978V63.8262H138.978V80.0967H10.6387V71.6797H0.611328V17.9033C0.611328 8.23849 8.44656 0.403565 18.1113 0.40332H128.95V10.0967ZM18.1113 3.40332C10.1034 3.40356 3.61133 9.89534 3.61133 17.9033V68.6797H10.6387V23.5967C10.6389 16.1411 16.6831 10.0968 24.1387 10.0967H125.95V3.40332H18.1113Z" fill="#0A0619" />
            <path d="M53.405 34.32H44.275C44.3883 33.7667 44.445 33.0133 44.445 32.06C44.445 31.5067 44.4083 30.9667 44.335 30.44C44.255 29.9067 44.125 29.43 43.945 29.01C43.765 28.5833 43.4916 28.2533 43.125 28.02C42.7516 27.78 42.275 27.66 41.695 27.66C41.0283 27.66 40.4216 27.8067 39.875 28.1C39.3283 28.3933 38.8416 28.77 38.415 29.23C37.995 29.6833 37.665 30.2133 37.425 30.82C37.185 31.4267 37.065 32.06 37.065 32.72C37.065 33.6733 37.315 34.4067 37.815 34.92C38.3083 35.4333 38.9583 35.8567 39.765 36.19C40.5716 36.5167 41.4883 36.79 42.515 37.01C43.5416 37.23 44.605 37.4867 45.705 37.78C46.625 38.0333 47.5416 38.3633 48.455 38.77C49.375 39.17 50.1916 39.71 50.905 40.39C51.6183 41.07 52.195 41.95 52.635 43.03C53.075 44.1167 53.295 45.4667 53.295 47.08C53.295 49.3867 52.8383 51.33 51.925 52.91C51.005 54.4833 49.7383 55.7633 48.125 56.75C46.5116 57.7433 44.595 58.46 42.375 58.9C40.1616 59.34 37.7516 59.56 35.145 59.56C32.505 59.56 30.3516 59.3867 28.685 59.04C27.0183 58.6933 25.7083 58.3167 24.755 57.91C23.615 57.43 22.7683 56.88 22.215 56.26L24.095 48.73H33.775C33.735 49.0567 33.695 49.5033 33.655 50.07C33.6216 50.6367 33.605 51.0867 33.605 51.42C33.605 51.86 33.6616 52.3167 33.775 52.79C33.8816 53.27 34.055 53.7133 34.295 54.12C34.5283 54.52 34.8683 54.85 35.315 55.11C35.755 55.3633 36.305 55.49 36.965 55.49C37.6983 55.49 38.3483 55.3233 38.915 54.99C39.4816 54.6633 39.9583 54.2533 40.345 53.76C40.7316 53.26 41.025 52.71 41.225 52.11C41.425 51.5033 41.525 50.9067 41.525 50.32C41.525 49.5133 41.3316 48.8333 40.945 48.28C40.565 47.7333 40.0416 47.2667 39.375 46.88C38.7216 46.5 37.9616 46.17 37.095 45.89C36.235 45.6167 35.345 45.3333 34.425 45.04C33.5516 44.7867 32.6283 44.4733 31.655 44.1C30.6816 43.74 29.7916 43.23 28.985 42.57C28.1783 41.9033 27.5083 41.0667 26.975 40.06C26.4483 39.0533 26.185 37.7633 26.185 36.19C26.185 33.8367 26.7783 31.8633 27.965 30.27C29.1583 28.6767 30.6616 27.3833 32.475 26.39C34.295 25.4033 36.285 24.7 38.445 24.28C40.6116 23.8533 42.665 23.64 44.605 23.64C47.1716 23.64 49.3816 23.9433 51.235 24.55C53.0883 25.1567 54.4916 25.8633 55.445 26.67L53.405 34.32ZM56.045 39.16L56.815 35.47C58.175 35.1767 59.3683 34.8467 60.395 34.48C61.4216 34.1133 62.365 33.6533 63.225 33.1C64.085 32.5533 64.9083 31.8767 65.695 31.07C66.4883 30.2633 67.3416 29.2733 68.255 28.1H73.925L72.325 35.47H76.615L75.905 39.16H71.555L69.305 49.88C69.1183 50.7267 68.9716 51.4767 68.865 52.13C68.7516 52.79 68.695 53.3033 68.695 53.67C68.695 54.41 68.9616 54.87 69.495 55.05C70.0283 55.2367 71.0283 55.33 72.495 55.33L71.665 59.12C71.4116 59.1933 71.0183 59.25 70.485 59.29C69.9516 59.3233 69.365 59.3667 68.725 59.42C68.085 59.48 67.425 59.5167 66.745 59.53C66.065 59.55 65.4683 59.56 64.955 59.56C64.0416 59.56 63.145 59.4967 62.265 59.37C61.385 59.2433 60.595 58.9867 59.895 58.6C59.2016 58.2133 58.6416 57.6533 58.215 56.92C57.795 56.1867 57.585 55.1967 57.585 53.95C57.585 53.51 57.6116 52.96 57.665 52.3C57.725 51.64 57.845 50.9067 58.025 50.1L60.335 39.16H56.045ZM78.765 42.4L79.805 37.51C81.6783 36.59 83.595 35.92 85.555 35.5C87.515 35.08 89.705 34.87 92.125 34.87C94.4716 34.87 96.415 35.05 97.955 35.41C99.495 35.7767 100.722 36.31 101.635 37.01C102.555 37.7033 103.198 38.5267 103.565 39.48C103.932 40.4333 104.115 41.5167 104.115 42.73C104.115 43.4233 104.068 44.1767 103.975 44.99C103.882 45.79 103.782 46.4667 103.675 47.02L101.085 59.12H92.235L91.245 55.6H90.915C89.7416 56.8867 88.375 57.8667 86.815 58.54C85.2616 59.22 83.715 59.56 82.175 59.56C81.295 59.56 80.4316 59.4333 79.585 59.18C78.745 58.92 77.995 58.5233 77.335 57.99C76.6683 57.4567 76.135 56.78 75.735 55.96C75.3283 55.1333 75.125 54.1333 75.125 52.96C75.125 51.0533 75.6483 49.54 76.695 48.42C77.7416 47.3 79.1183 46.4567 80.825 45.89C82.5316 45.3233 84.455 44.9667 86.595 44.82C88.7416 44.6733 90.895 44.6 93.055 44.6C93.1283 44.2333 93.2216 43.71 93.335 43.03C93.4483 42.35 93.505 41.7533 93.505 41.24C93.505 40.5867 93.3283 39.9733 92.975 39.4C92.6283 38.8333 91.905 38.55 90.805 38.55C89.525 38.55 88.5816 38.9267 87.975 39.68C87.3683 40.4267 86.975 41.3333 86.795 42.4H78.765ZM91.575 51.42L92.455 47.18H91.465C90.405 47.18 89.4983 47.32 88.745 47.6C87.9916 47.8733 87.385 48.23 86.925 48.67C86.4716 49.11 86.1316 49.6067 85.905 50.16C85.6916 50.7067 85.585 51.2533 85.585 51.8C85.585 52.68 85.8116 53.3433 86.265 53.79C86.725 54.23 87.265 54.45 87.885 54.45C88.6583 54.45 89.4216 54.1733 90.175 53.62C90.9283 53.0667 91.395 52.3333 91.575 51.42ZM120.615 38.99H120.945C121.712 38.2567 122.572 37.58 123.525 36.96C124.372 36.4467 125.382 35.97 126.555 35.53C127.728 35.09 129.048 34.87 130.515 34.87C132.275 34.87 133.585 35.27 134.445 36.07C135.305 36.8767 135.792 37.87 135.905 39.05H136.235C137.075 38.2767 137.992 37.58 138.985 36.96C139.825 36.4467 140.815 35.97 141.955 35.53C143.088 35.09 144.298 34.87 145.585 34.87C147.492 34.87 149.042 35.39 150.235 36.43C151.422 37.4767 152.015 38.8267 152.015 40.48C152.015 41.32 151.868 42.4367 151.575 43.83C151.282 45.2233 150.952 46.7467 150.585 48.4L148.275 59.12H137.445L140.415 44.76C140.522 44.2133 140.632 43.6833 140.745 43.17C140.852 42.6567 140.905 42.2367 140.905 41.91C140.905 41.3967 140.758 40.9633 140.465 40.61C140.172 40.2633 139.752 40.09 139.205 40.09C138.505 40.09 137.855 40.3367 137.255 40.83C136.648 41.3233 136.178 41.7367 135.845 42.07L132.275 59.12H121.985L125.015 44.76C125.088 44.2867 125.182 43.8033 125.295 43.31C125.402 42.8167 125.455 42.3667 125.455 41.96C125.455 41.4133 125.318 40.9633 125.045 40.61C124.765 40.2633 124.352 40.09 123.805 40.09C123.145 40.09 122.512 40.3267 121.905 40.8C121.298 41.28 120.832 41.6833 120.505 42.01L116.875 59.12H105.655L110.655 35.47H119.625L120.615 38.99ZM164.995 55.54L162.245 68.36H151.025L157.955 35.47H166.925L167.915 38.99H168.245C169.565 37.5967 171.042 36.5967 172.675 35.99C174.302 35.3833 175.905 35.08 177.485 35.08C178.765 35.08 179.838 35.2733 180.705 35.66C181.565 36.0467 182.252 36.57 182.765 37.23C183.278 37.89 183.645 38.68 183.865 39.6C184.085 40.5133 184.195 41.4833 184.195 42.51C184.195 43.0233 184.158 43.7933 184.085 44.82C184.012 45.8467 183.845 46.9933 183.585 48.26C183.332 49.5267 182.965 50.8267 182.485 52.16C182.012 53.5 181.382 54.72 180.595 55.82C179.802 56.92 178.812 57.82 177.625 58.52C176.432 59.2133 175.008 59.56 173.355 59.56C172.442 59.56 171.555 59.45 170.695 59.23C169.828 59.01 169.048 58.7167 168.355 58.35C167.655 57.9833 167.042 57.5533 166.515 57.06C165.982 56.56 165.585 56.0533 165.325 55.54H164.995ZM168.075 54.22C168.955 54.22 169.688 53.7533 170.275 52.82C170.862 51.8867 171.338 50.7867 171.705 49.52C172.072 48.26 172.338 46.9967 172.505 45.73C172.672 44.4633 172.755 43.5167 172.755 42.89C172.755 42.1633 172.635 41.56 172.395 41.08C172.155 40.6067 171.725 40.37 171.105 40.37C170.405 40.37 169.745 40.6167 169.125 41.11C168.498 41.6033 168.038 42.0333 167.745 42.4L165.605 52.46C165.898 52.8667 166.245 53.2633 166.645 53.65C167.052 54.03 167.528 54.22 168.075 54.22ZM201.185 59.12H185.405L192.825 24.2H207.625C209.898 24.2 211.888 24.4267 213.595 24.88C215.295 25.34 216.705 26.1 217.825 27.16C218.945 28.2267 219.788 29.6233 220.355 31.35C220.922 33.07 221.205 35.1767 221.205 37.67C221.205 40.35 220.868 42.97 220.195 45.53C219.515 48.1033 218.385 50.3967 216.805 52.41C215.232 54.4233 213.172 56.0467 210.625 57.28C208.072 58.5067 204.925 59.12 201.185 59.12ZM198.105 55.27H200.475C201.682 55.27 202.755 54.7667 203.695 53.76C204.628 52.7467 205.435 51.4633 206.115 49.91C206.788 48.35 207.355 46.6267 207.815 44.74C208.275 42.8533 208.642 41.0267 208.915 39.26C209.188 37.5 209.392 35.9233 209.525 34.53C209.652 33.1367 209.715 32.15 209.715 31.57C209.715 30.43 209.485 29.54 209.025 28.9C208.565 28.26 207.768 27.94 206.635 27.94H203.995L198.105 55.27ZM224.015 35.47H235.615L237.265 51.64L245.955 35.47H251.785L238.535 59.12C237.215 61.4267 235.875 63.2033 234.515 64.45C233.162 65.7033 231.688 66.6233 230.095 67.21C228.495 67.79 226.735 68.1267 224.815 68.22C222.888 68.3133 220.695 68.36 218.235 68.36L219.065 64.57C220.272 64.57 221.398 64.55 222.445 64.51C223.492 64.47 224.325 64.36 224.945 64.18C225.792 63.96 226.398 63.5667 226.765 63C227.132 62.4267 227.315 61.5933 227.315 60.5C227.315 59.7667 227.252 58.92 227.125 57.96C226.992 57.0133 226.852 56.0067 226.705 54.94L224.015 35.47Z" fill="#0A0619" />
          </svg>
        </NuxtLink>

        <!-- Mobile Menu Button -->
        <button
          type="button"
          class="lg:hidden flex items-center justify-center w-9 h-9 text-gray-800 hover:text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition-colors"
          aria-expanded="false"
          aria-label="Toggle navigation"
          @click="toggleMobileMenu"
        >
          <svg
            v-show="!isMobileMenuOpen"
            class="w-4 h-4"
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
            <line
              x1="3"
              x2="21"
              y1="6"
              y2="6"
            />
            <line
              x1="3"
              x2="21"
              y1="12"
              y2="12"
            />
            <line
              x1="3"
              x2="21"
              y1="18"
              y2="18"
            />
          </svg>
          <svg
            v-show="isMobileMenuOpen"
            class="w-4 h-4"
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

      <!-- Desktop Navigation -->
      <div class="hidden overflow-hidden transition-all duration-300 basis-full grow lg:block lg:w-2xl lg:basis-auto lg:order-2 lg:col-span-6">
        <div class="flex flex-col gap-y-4 gap-x-0 mt-5 lg:flex-row lg:justify-center lg:items-center lg:gap-y-0 lg:gap-x-6 lg:mt-0">
          <div>
            <NuxtLink
              :class="[
                'relative inline-block focus:outline-hidden transition-all duration-200 px-2 py-2 rounded-lg whitespace-nowrap',
                isActiveLink('/')
                  ? 'text-blue-600 font-semibold bg-blue-50 shadow-sm'
                  : 'text-black hover:text-gray-600 hover:bg-gray-50',
              ]"
              :to="getNavLink('/')"
            >
              {{ t('nav.Home') }}
              <span
                v-if="isActiveLink('/')"
                class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-blue-600 rounded-full"
              />
            </NuxtLink>
          </div>
          <div>
            <NuxtLink
              :class="[
                'relative inline-block focus:outline-hidden transition-all duration-200 px-2 py-2 rounded-lg whitespace-nowrap',
                isActiveLink('/stamp-maker')
                  ? 'text-blue-600 font-semibold bg-blue-50 shadow-sm'
                  : 'text-black hover:text-gray-600 hover:bg-gray-50',
              ]"
              :to="getNavLink('/stamp-maker')"
            >
              {{ t('nav.StampMaker') }}
              <span
                v-if="isActiveLink('/stamp-maker')"
                class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-blue-600 rounded-full"
              />
            </NuxtLink>
          </div>
          <div>
            <NuxtLink
              :class="[
                'relative inline-block focus:outline-hidden transition-all duration-200 px-2 py-2 rounded-lg whitespace-nowrap',
                isActiveLink('/stamp-template')
                  ? 'text-blue-600 font-semibold bg-blue-50 shadow-sm'
                  : 'text-black hover:text-gray-600 hover:bg-gray-50',
              ]"
              :to="getNavLink('/stamp-template')"
            >
              {{ t('nav.StampTemplates') }}
              <span
                v-if="isActiveLink('/stamp-template')"
                class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-blue-600 rounded-full"
              />
            </NuxtLink>
          </div>
          <div>
            <NuxtLink
              :class="[
                'relative inline-block focus:outline-hidden transition-all duration-200 px-2 py-2 rounded-lg whitespace-nowrap',
                isActiveLink('/pdf-editor')
                  ? 'text-blue-600 font-semibold bg-blue-50 shadow-sm'
                  : 'text-black hover:text-gray-600 hover:bg-gray-50',
              ]"
              :to="getNavLink('/pdf-editor')"
            >
              {{ t('nav.PDFEditor') }}
              <span
                v-if="isActiveLink('/pdf-editor')"
                class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-blue-600 rounded-full"
              />
            </NuxtLink>
          </div>
          <div>
            <NuxtLink
              :class="[
                'relative inline-block focus:outline-hidden transition-all duration-200 px-2 py-2 rounded-lg whitespace-nowrap',
                isActiveLink('/blog')
                  ? 'text-blue-600 font-semibold bg-blue-50 shadow-sm'
                  : 'text-black hover:text-gray-600 hover:bg-gray-50',
              ]"
              :to="getNavLink('/blog')"
            >
              {{ t('nav.Blog') }}
              <span
                v-if="isActiveLink('/blog')"
                class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-blue-600 rounded-full"
              />
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div
        :class="[
          'w-full overflow-hidden transition-all duration-300 basis-full lg:hidden',
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
        ]"
      >
        <div class="flex flex-col divide-y divide-gray-200 mt-5 py-3">
          <div class="py-2">
            <NuxtLink
              :class="[
                'block py-2 px-3 text-sm font-medium transition-all duration-200 rounded-lg mx-1 whitespace-nowrap',
                isActiveLink('/')
                  ? 'text-blue-600 font-semibold bg-blue-50'
                  : 'text-black hover:text-gray-600 hover:bg-gray-50',
              ]"
              :to="getNavLink('/')"
              @click="closeMobileMenu"
            >
              {{ t('nav.Home') }}
            </NuxtLink>
          </div>
          <div class="py-2">
            <NuxtLink
              :class="[
                'block py-2 px-3 text-sm font-medium transition-all duration-200 rounded-lg mx-1 whitespace-nowrap',
                isActiveLink('/stamp-maker')
                  ? 'text-blue-600 font-semibold bg-blue-50'
                  : 'text-black hover:text-gray-600 hover:bg-gray-50',
              ]"
              :to="getNavLink('/stamp-maker')"
              @click="closeMobileMenu"
            >
              {{ t('nav.StampMaker') }}
            </NuxtLink>
          </div>
          <div class="py-2">
            <NuxtLink
              :class="[
                'block py-2 px-3 text-sm font-medium transition-all duration-200 rounded-lg mx-1 whitespace-nowrap',
                isActiveLink('/stamp-template')
                  ? 'text-blue-600 font-semibold bg-blue-50'
                  : 'text-black hover:text-gray-600 hover:bg-gray-50',
              ]"
              :to="getNavLink('/stamp-template')"
              @click="closeMobileMenu"
            >
              {{ t('nav.StampTemplates') }}
            </NuxtLink>
          </div>
          <div class="py-2">
            <NuxtLink
              :class="[
                'block py-2 px-3 text-sm font-medium transition-all duration-200 rounded-lg mx-1 whitespace-nowrap',
                isActiveLink('/pdf-editor')
                  ? 'text-blue-600 font-semibold bg-blue-50'
                  : 'text-black hover:text-gray-600 hover:bg-gray-50',
              ]"
              :to="getNavLink('/pdf-editor')"
              @click="closeMobileMenu"
            >
              {{ t('nav.PDFEditor') }}
            </NuxtLink>
          </div>
          <div class="py-2">
            <NuxtLink
              :class="[
                'block py-2 px-3 text-sm font-medium transition-all duration-200 rounded-lg mx-1 whitespace-nowrap',
                isActiveLink('/blog')
                  ? 'text-blue-600 font-semibold bg-blue-50'
                  : 'text-black hover:text-gray-600 hover:bg-gray-50',
              ]"
              :to="getNavLink('/blog')"
              @click="closeMobileMenu"
            >
              {{ t('nav.Blog') }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>
  </header>
<!-- ========== END HEADER ========== -->
</template>

<script setup lang="ts">
// 响应式状态
const isMobileMenuOpen = ref(false)
const route = useRoute()
const { t } = useI18n()
const localePath = useLocalePath()

// 仅英文版本的页面路径
const englishOnlyPages = ['/stamp-template', '/blog']

// 获取导航链接 - 英文专用页面强制使用英文路由
const getNavLink = (path: string): string => {
  if (englishOnlyPages.includes(path)) {
    // 对于仅英文页面，始终返回英文路径
    return path
  }
  // 对于支持多语言的页面，使用localePath
  return localePath(path)
}

// 切换移动端菜单
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

// 关闭移动端菜单
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// 判断链接是否为活跃状态
const isActiveLink = (path: string): boolean => {
  const currentPath = route.path

  // 精确匹配首页
  if (path === '/') {
    return currentPath === '/'
  }

  // 对于其他路径，检查当前路径是否以目标路径开头
  // 这样可以支持子路径，比如 /blog/some-article 会激活 /blog 导航
  return currentPath.startsWith(path)
}

// 生命周期钩子
onMounted(() => {
  const router = useRouter()

  // 路由变化时关闭移动端菜单
  router.afterEach(() => {
    closeMobileMenu()
  })

  // 点击外部时关闭移动端菜单
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement
    const nav = document.querySelector('nav')

    if (nav && !nav.contains(target)) {
      closeMobileMenu()
    }
  })
})
</script>
