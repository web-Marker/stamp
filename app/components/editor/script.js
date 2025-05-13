let clientSecret,
  img = [],
  invertText = !1
function getFormattedTimestamp() {
  const e = new Date()
  return `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(
    2,
    '0'
  )}-${String(e.getDate()).padStart(2, '0')} ${String(e.getHours()).padStart(
    2,
    '0'
  )}:${String(e.getMinutes()).padStart(2, '0')}:${String(
    e.getSeconds()
  ).padStart(2, '0')}`
}
function onSubmitForm() {}
function savePngAjax(e) {
  $.ajax({
    type: 'POST',
    url: 'savepng.php',
    data: e,
    dataType: 'json',
    success: function (e) {
      $('.loader').hide(),
        !0 === e.status && !1 === e.redirect
          ? (gtag('event', 'purchase', {
              transaction_id: e.data.transaction_id,
              value: e.data.amount,
              currency: e.data.currency,
            }),
            showMeta &&
              fbq('track', 'Purchase', {
                currency: e.data.currency,
                value: e.data.amount,
              }),
            $('.fixed_side1').addClass('fixed_side1_'),
            $('.alert_popup').addClass('alert_popup_'),
            setTimeout(() => {
              window.location.href = 'success.php'
            }, 1e3))
          : (isRZP || card.clear(),
            $('#emailSendButton').prop('disabled', !1),
            $('#sendEmail').val(''),
            $('#nameoncard').val(''),
            $('#spinner').hide(),
            $('#checkoutForm')[0].reset(),
            $('#submitBtnText').show(),
            $('.col5_close').click(),
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: e.message,
            }),
            !0 === e.redirect &&
              setTimeout(() => {
                window.location.reload()
              }, 1e3))
    },
  })
}
$(function () {
  $('.shape-box').tooltip({
    trigger: 'hover',
  }),
    $('.shape-box').on('click', function () {
      $(this).tooltip('hide')
    })
}),
  $(document).ready(function () {
    $('.loader').hide()
  }),
  $('.shop-box-item').click(function () {
    $('.shop-box-item').removeClass('active'), $(this).addClass('active')
  }),
  $('.col5_close').on('click', function () {
    $('.loader').hide()
  }),
  $('#checkoutForm').submit(function (e) {
    if (($('.loader').hide(), e.preventDefault(), checkFormValidation())) {
      ;(emailtext = document.getElementById('sendEmail').value),
        (amountBtnText = $('#emailSendButton').text()),
        $('.email_popup').removeClass('email_popup_'),
        $('.fixed_side1').removeClass('fixed_side1_'),
        $('.loader').show()
      let e = document.getElementById('sendEmail').value,
        t = document.getElementById('nameoncard').value
      if (
        ((pngFile = canvas.elt.toDataURL('image/png')),
        collectData(getFormattedTimestamp()),
        !isRZP)
      ) {
        let l = ''
        ;(cardHolderName = $('#nameoncard').val()),
          Stripe.confirmCardPayment(clientSecret, {
            payment_method: {
              card: card,
              billing_details: {
                name: cardHolderName,
              },
            },
          }).then(function (n) {
            if (n.error) {
              if (
                ($('.loader').hide(),
                n.error.message,
                card.clear(),
                $('#emailSendButton').prop('disabled', !1),
                $('.open_email_popup').prop('disabled', !1),
                $('#sendEmail').val(''),
                $('#nameoncard').val(''),
                $('#spinner').hide(),
                $('#submitBtnText').show(),
                $('.col5_close').click(),
                Swal.fire({
                  icon: 'error',
                  title: 'Card Error',
                  text:
                    'Try your payment again. It usually succeeds on the 3rd attempt. Error: ' +
                    n.error.message,
                }),
                'lost_card' != n.error.decline_code ||
                  'stolen_card' != n.error.decline_code)
              ) {
                const l = {
                  image: pngFile,
                  mail: e,
                  name: t,
                  amountPlatinum: encrypted3,
                  amountGlod: encrypted2,
                  currency: encrypted1,
                  message: n.error.message,
                }
                $.ajax({
                  type: 'POST',
                  url: 'send_email_on_card_error.php',
                  data: l,
                  dataType: 'json',
                  success: function (e) {},
                })
              }
              return !1
            }
            {
              l = n.paymentIntent.id
              let e = document.getElementById('sendEmail').value,
                t = document.getElementById('nameoncard').value
              ;(pngFile = canvas.elt.toDataURL('image/png')),
                collectData(getFormattedTimestamp()),
                savePngAjax({
                  recaptchaToken: n,
                  imgBase64: pngFile,
                  mail: e,
                  name: t,
                  stripetoken: l,
                  amountPlatinum: encrypted3,
                  amountGlod: encrypted2,
                  currency: encrypted1,
                })
            }
          })
      }
    }
  }),
  $('#close_alert').click(function () {
    $('.alert_popup').removeClass('alert_popup_'),
      $('.fixed_side2').removeClass('fixed_side2_')
  }),
  (window.onbeforeunload = function () {
    collectData(getFormattedTimestamp())
  })
let canvas,
  CanvasTextIssue = !1
function showEnterText() {
  ;(CanvasTextIssue = !0),
    document
      .querySelector('#dwnBtnFree')
      .addEventListener('click', function () {
        document.getElementById('noText').style.display = 'block'
      }),
    $('#noText').delay(5e3).hide(420),
    $('#dwnBtnFree').click(function () {
      $('.fixed_side1').removeClass('fixed_side1_'),
        $('.pricing_popup').removeClass('pricing_popup_'),
        $('body').removeClass('scroll_stop')
    })
}
function showPricingAfterEnterText() {
  ;(CanvasTextIssue = !1),
    $('#dwnBtnFree').click(function () {
      userId || $('#intialEmailModal').modal('show')
    }),
    $('.col5_close').click(function () {
      $('.fixed_side1').removeClass('fixed_side1_'),
        $('.fixed_side2').removeClass('fixed_side2_'),
        $('.pricing_popup').removeClass('pricing_popup_'),
        $('body').removeClass('scroll_stop')
    }),
    $('.close').click(function () {
      $('.alert').css('display', 'none')
    })
}
function createPNG(e = null) {
  null != e &&
    ($('.pricing_popup').removeClass('pricing_popup_'),
    $('.fixed_side1').removeClass('fixed_side1_'),
    $('.loader').show(),
    $.ajax({
      type: 'POST',
      url: 'setUserPlan.php',
      dataType: 'json',
      data: {
        pFlag: e,
        amountPlatinum: encrypted3,
        amountGlod: encrypted2,
        currency: encrypted1,
        country: encrypted4,
      },
      success: function (t) {
        0 == !t.status
          ? ($('.loader').hide(),
            $('#emailSendButton').prop('disabled', !1),
            t.data.key
              ? ((options = t.data),
                rzpHandler(options),
                (razorpay = new Razorpay(options, {
                  name: 'Stampjam',
                  description: 'stamps',
                })))
              : ((clientSecret = t.message), (paymentIntentId = t.data.id)),
            (actualamount = ''),
            (actualamount += 1 == e ? t.amountGold : t.amountPlatinum),
            (actualamount = actualamount + ' ' + t.currency),
            (amount = 'Pay ' + actualamount),
            (planName =
              1 == e ? 'Basic' : 'Starter (PNG, PDF, SVG, EPS & JPG)'),
            $('#planName').text(planName),
            $('#amount').text(actualamount + ' (incl. all taxes & fees)'),
            $('#totalamount').text(actualamount),
            $('#emailSendButton').text(amount),
            $('#rzp-btn-text').text(amount),
            setTimeout(() => {
              $('.fixed_side1').addClass('fixed_side1_'),
                $('.email_popup').addClass('email_popup_'),
                $('.coupon_alert').html(''),
                $('.coupon_alert').removeClass('alert-danger'),
                $('.coupon_alert').removeClass('alert-success'),
                $('.coupon_alert').hide(),
                $('#attach_coupon').prop('checked', !1)
            }, 200))
          : (Swal.fire({
              icon: 'error',
              title: 'Error',
              text: t.message,
            }),
            $('.col5_close').click())
      },
    }))
}
function rzpHandler(e) {
  ;(e.handler = function (e) {
    $('.email_popup').removeClass('email_popup_'),
      $('.fixed_side1').removeClass('fixed_side1_'),
      $('.loader').show(),
      (rzpPayId = e.razorpay_payment_id),
      (rzpSignature = e.razorpay_signature)
    let t = document.getElementById('sendEmail').value,
      l = document.getElementById('nameoncard').value
    ;(pngFile = canvas.elt.toDataURL('image/png')),
      collectData(getFormattedTimestamp()),
      savePngAjax({
        recaptchaToken: e,
        imgBase64: pngFile,
        mail: t,
        name: l,
        razorpay_payment_id: rzpPayId,
        razorpay_signature: rzpSignature,
        razorpay: !0,
        amountPlatinum: encrypted3,
        amountGlod: encrypted2,
        currency: encrypted1,
      })
  }),
    (e.modal = {
      ondismiss: function () {
        $('.fixed_side1').removeClass('fixed_side1_'),
          $('.email_popup').removeClass('email_popup_')
      },
      escape: !0,
      backdropclose: !1,
    })
}
;(document.onreadystatechange = function () {
  'complete' == document.readyState && setTimeout(function () {}, 300)
}),
  $('#rzp-btn').click(function (e) {
    e.preventDefault(),
      checkFormValidation() && razorpay.open(),
      razorpay.on('payment.failed', function (e) {
        razorpay.close(),
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text:
              e.error.description +
              '. This Page will be reloaded in 3 seconds.',
          }),
          $('.fixed_side1').removeClass('fixed_side1_'),
          $('.email_popup').removeClass('email_popup_'),
          setTimeout(function () {
            window.location.reload()
          }, 3e3)
      })
  })
const width = 500,
  height = 500
let highlightLayerId,
  lsImage,
  npoints,
  shapeClone,
  toManipulate,
  openCloseEyeId,
  templateCategory,
  shapeCategory,
  circularTextLayerId,
  rad,
  centerTextLayerId,
  bottomTextLayerId,
  topTextLayerId,
  rectTextLayerId,
  ovalTextLayerId,
  ovalRad,
  quadTextLayerId,
  hasNoControlLayerId,
  layerCategory,
  canvasA = [],
  layerA = [],
  redoA = [],
  holdImgFlag = [],
  canvasLen = canvasA.length,
  elementCount = -1,
  objectCount = 0,
  layerCount = 0,
  highlightLayerFlag = !0,
  objSelectFlag = !1,
  layerSelectFlag = !1,
  rectFlag = !1,
  circleFlag = !1,
  squareFlag = !1,
  triangleFlag = !1,
  hexagramFlag = !1,
  pentagonFlag = !1,
  nonagonFlag = !1,
  hexagonFlag = !1,
  starFlag = !1,
  octagonFlag = !1,
  twoSixFlag = !1,
  quadFlag = !1,
  ovalFlag = !1,
  lineFlag = !1,
  cubeFlag = !1,
  circularTextFlag = !1,
  centerTextFlag = !1,
  topTextFlag = !1,
  bottomTextFlag = !1,
  rectTextFlag = !1,
  ovalTextFlag = !1,
  quadTextFlag = !1,
  imgOnCanvasCounter = 0,
  imgOnCanvasTemplateCounter = 0,
  drawImageFlag = !1,
  imgArray = [],
  path = [],
  shapeId = -1,
  eyeId = -1,
  rFrameCount = 0,
  cFrameCount = 0,
  sFrameCount = 0,
  tFrameCount = 0,
  ovalFrameCount = 0,
  pFrameCount = 0,
  dFrameCount = 0,
  hFrameCount = 0,
  starFrameCount = 0,
  octagonFrameCount = 0,
  hexagramFrameCount = 0,
  nonagonFrameCount = 0,
  twoSixFrameCount = 0,
  lineFrameCount = 0,
  cubeFrameCount = 0,
  textAroundFrameCount = 0,
  texCenterFrameCount = 0,
  texBottomFrameCount = 0,
  textTopFrameCount = 0,
  textRectFrameCount = 0,
  textOvalFrameCount = 0,
  textQuadFrameCount = 0,
  imgFrameCount = 0,
  eyeFlag = !0,
  shapeCategoryFlag = !1,
  color = 0,
  r = 27,
  g = 73,
  b = 172,
  fsbcObj = {},
  fstcObj = {},
  fsiObj = {},
  fwcObj = {},
  circularTextFontSelect = 'Times New Roman',
  fsblObj = {},
  fstlObj = {},
  fwlObj = {},
  fsilObj = {},
  lineFont = 'Times New Roman',
  fsbbObj = {},
  fstbObj = {},
  fsibObj = {},
  fswbObj = {},
  bottomFont = 'Times New Roman',
  fsbtObj = {},
  fsttObj = {},
  fsitObj = {},
  fswtObj = {},
  topFont = 'Times New Roman',
  fsbrObj = {},
  fstrObj = {},
  fsirObj = {},
  fswrObj = {},
  rectFont = 'Times New Roman',
  fsboObj = {},
  fstoObj = {},
  fsioObj = {},
  fswoObj = {},
  fwoObj = {},
  ovalTextFontSelect = 'Times New Roman',
  fsbqObj = {},
  fstqObj = {},
  fsiqObj = {},
  fwqObj = {},
  quadTextFontSelect = 'Times New Roman',
  layerCounterToggle = 0
function displayCircularTextLayerId(e) {
  0 == document.getElementById(e).value.length
    ? (document.getElementById(circularTextLayerId).innerHTML =
        document.getElementById(e).placeholder)
    : (document.getElementById(circularTextLayerId).innerHTML =
        document.getElementById(e).value)
}
function fontStyleBoldCircular(e) {
  let t = e.id.split('_')[0]
  '' == e.value
    ? ((e.value = 'clicked'),
      'italic' == fsbcObj[t]
        ? (fsbcObj[t] = 'bold italic')
        : (fsbcObj[t] = 'bold'),
      $('#' + e.id)
        .children('img')
        .attr('src', 'images/bold-blue.svg'),
      $('#' + e.id).addClass('textStyleSelected'))
    : ((e.value = ''),
      'bold italic' == fsbcObj[t]
        ? (fsbcObj[t] = 'italic')
        : (fsbcObj[t] = 'normal'),
      $('#' + e.id)
        .children('img')
        .attr('src', 'images/bold.svg'),
      $('#' + e.id).removeClass('textStyleSelected'))
}
function fontStyleItalicCircular(e) {
  let t = e.id.split('_')[0]
  '' == e.value
    ? ((e.value = 'clicked'),
      'bold' == fsbcObj[t]
        ? (fsbcObj[t] = 'bold italic')
        : (fsbcObj[t] = 'italic'),
      $('#' + e.id)
        .children('img')
        .attr('src', 'images/italic-blue.svg'),
      $('#' + e.id).addClass('textStyleSelected'))
    : ((e.value = ''),
      'bold italic' == fsbcObj[t]
        ? (fsbcObj[t] = 'bold')
        : (fsbcObj[t] = 'normal'),
      $('#' + e.id)
        .children('img')
        .attr('src', 'images/italic.svg'),
      $('#' + e.id).removeClass('textStyleSelected'))
}
function fontTransformCircular(e) {
  let t = e.id.split('_')[0]
  '' == e.value
    ? ((e.value = 'clicked'),
      (fstcObj[t] = 'upperCase'),
      $('#' + e.id)
        .children('img')
        .attr('src', 'images/tt-blue.svg'),
      $('#' + e.id).addClass('textStyleSelected'))
    : ((e.value = ''),
      (fstcObj[t] = 'lowerCase'),
      $('#' + e.id)
        .children('img')
        .attr('src', 'images/textTransform.svg'),
      $('#' + e.id).removeClass('textStyleSelected'))
}
function fontInvertCircular(e) {
  let t = e.id.split('_')[0]
  '' == e.value
    ? ((e.value = 'clicked'),
      (fsiObj[t] = 'invert'),
      $('#' + e.id)
        .children('img')
        .attr('src', 'images/invert-blue.svg'),
      $('#' + e.id).addClass('textStyleSelected'))
    : ((e.value = ''),
      (fsiObj[t] = 'normal'),
      $('#' + e.id)
        .children('img')
        .attr('src', 'images/invert.svg'),
      $('#' + e.id).removeClass('textStyleSelected'))
}
function fontWhitenCircular(e) {
  let t = e.id.split('_')[0]
  '' == e.value
    ? ((e.value = 'clicked'),
      (fwcObj[t] = 'whiten'),
      $('#' + e.id)
        .children('img')
        .attr('src', 'images/text-whiten-blue.svg'),
      $('#' + e.id).addClass('textStyleSelected'))
    : ((e.value = ''),
      (fwcObj[t] = 'normal'),
      $('#' + e.id)
        .children('img')
        .attr('src', 'images/text-whiten.svg'),
      $('#' + e.id).removeClass('textStyleSelected'))
}
function displayLineTextLayerId(e) {
  0 == document.getElementById(e).value.length
    ? (document.getElementById(centerTextLayerId).innerHTML =
        document.getElementById(e).placeholder)
    : (document.getElementById(centerTextLayerId).innerHTML =
        document.getElementById(e).value)
}
function fontStyleBoldLine(e) {
  let t = e.id.split('_')[0]
  '' == e.value
    ? ((e.value = 'clicked'),
      'italic' == fsblObj[t]
        ? (fsblObj[t] = 'bold italic')
        : (fsblObj[t] = 'bold'),
      $('#' + e.id)
        .children('img')
        .attr('src', 'images/bold-blue.svg'),
      $('#' + e.id).addClass('textStyleSelected'))
    : ((e.value = ''),
      'bold italic' == fsblObj[t]
        ? (fsblObj[t] = 'italic')
        : (fsblObj[t] = 'normal'),
      $('#' + e.id)
        .children('img')
        .attr('src', 'images/bold.svg'),
      $('#' + e.id).removeClass('textStyleSelected'))
}
function fontStyleItalicLine(e) {
  let t = e.id.split('_')[0]
  '' == e.value
    ? ((e.value = 'clicked'),
      'bold' == fsblObj[t]
        ? (fsblObj[t] = 'bold italic')
        : (fsblObj[t] = 'italic'),
      $('#' + e.id)
        .children('img')
        .attr('src', 'images/italic-blue.svg'),
      $('#' + e.id).addClass('textStyleSelected'))
    : ((e.value = ''),
      'bold italic' == fsblObj[t]
        ? (fsblObj[t] = 'bold')
        : (fsblObj[t] = 'normal'),
      $('#' + e.id)
        .children('img')
        .attr('src', 'images/italic.svg'),
      $('#' + e.id).removeClass('textStyleSelected'))
}
function fontTransformLine(e) {
  let t = e.id.split('_')[0]
  '' == e.value
    ? ((e.value = 'clicked'),
      (fstlObj[t] = 'upperCase'),
      $('#' + e.id)
        .children('img')
        .attr('src', 'images/tt-blue.svg'),
      $('#' + e.id).addClass('textStyleSelected'))
    : ((e.value = ''),
      (fstlObj[t] = 'lowerCase'),
      $('#' + e.id)
        .children('img')
        .attr('src', 'images/textTransform.svg'),
      $('#' + e.id).removeClass('textStyleSelected'))
}
function fontInvertLine(e) {
  let t = e.id.split('_')[0]
  '' == e.value
    ? ((e.value = 'clicked'),
      (fsilObj[t] = 'invert'),
      $('#' + e.id)
        .children('img')
        .attr('src', 'images/invert-blue.svg'),
      $('#' + e.id).addClass('textStyleSelected'))
    : ((e.value = ''),
      (fsilObj[t] = 'normal'),
      $('#' + e.id)
        .children('img')
        .attr('src', 'images/invert.svg'),
      $('#' + e.id).removeClass('textStyleSelected'))
}
function fontWhitenLine(e) {
  let t = e.id.split('_')[0]
  '' == e.value
    ? ((e.value = 'clicked'),
      (fwlObj[t] = 'whiten'),
      $('#' + e.id)
        .children('img')
        .attr('src', 'images/text-whiten-blue.svg'),
      $('#' + e.id).addClass('textStyleSelected'))
    : ((e.value = ''),
      (fwlObj[t] = 'normal'),
      $('#' + e.id)
        .children('img')
        .attr('src', 'images/text-whiten.svg'),
      $('#' + e.id).removeClass('textStyleSelected'))
}
function displayBottomTextLayerId(e) {
  0 == document.getElementById(e).value.length
    ? (document.getElementById(bottomTextLayerId).innerHTML =
        document.getElementById(e).placeholder)
    : (document.getElementById(bottomTextLayerId).innerHTML =
        document.getElementById(e).value),
    0 == document.getElementById(e).value.length
      ? (document.getElementById(bottomTextLayerId).innerHTML =
          document.getElementById(e).placeholder)
      : (document.getElementById(bottomTextLayerId).innerHTML =
          document.getElementById(e).value),
    0 == document.getElementById(e).value.length
      ? (document.getElementById(bottomTextLayerId).innerHTML =
          document.getElementById(e).placeholder)
      : (document.getElementById(bottomTextLayerId).innerHTML =
          document.getElementById(e).value),
    0 == document.getElementById(e).value.length
      ? (document.getElementById(bottomTextLayerId).innerHTML =
          document.getElementById(e).placeholder)
      : (document.getElementById(bottomTextLayerId).innerHTML =
          document.getElementById(e).value)
}
function fontStyleBoldBottom(e) {
  let t = e.id.split('_')[0]
  '' == e.value
    ? ((e.value = 'clicked'),
      'italic' == fsbbObj[t]
        ? (fsbbObj[t] = 'bold italic')
        : (fsbbObj[t] = 'bold'),
      $('#' + e.id)
        .children('img')
        .attr('src', 'images/bold-blue.svg'),
      $('#' + e.id).addClass('textStyleSelected'))
    : ((e.value = ''),
      'bold italic' == fsbbObj[t]
        ? (fsbbObj[t] = 'italic')
        : (fsbbObj[t] = 'normal'),
      $('#' + e.id)
        .children('img')
        .attr('src', 'images/bold.svg'),
      $('#' + e.id).removeClass('textStyleSelected'))
}
function fontStyleItalicBottom(e) {
  let t = e.id.split('_')[0]
  '' == e.value
    ? ((e.value = 'clicked'),
      'bold' == fsbbObj[t]
        ? (fsbbObj[t] = 'bold italic')
        : (fsbbObj[t] = 'italic'),
      $('#' + e.id)
        .children('img')
        .attr('src', 'images/italic-blue.svg'),
      $('#' + e.id).addClass('textStyleSelected'))
    : ((e.value = ''),
      'bold italic' == fsbbObj[t]
        ? (fsbbObj[t] = 'bold')
        : (fsbbObj[t] = 'normal'),
      $('#' + e.id)
        .children('img')
        .attr('src', 'images/italic.svg'),
      $('#' + e.id).removeClass('textStyleSelected'))
}
function fontTransformBottom(e) {
  let t = e.id.split('_')[0]
  '' == e.value
    ? ((e.value = 'clicked'),
      (fstbObj[t] = 'upperCase'),
      $('#' + e.id)
        .children('img')
        .attr('src', 'images/tt-blue.svg'),
      $('#' + e.id).addClass('textStyleSelected'))
    : ((e.value = ''),
      (fstbObj[t] = 'lowerCase'),
      $('#' + e.id)
        .children('img')
        .attr('src', 'images/textTransform.svg'),
      $('#' + e.id).removeClass('textStyleSelected'))
}
function fontInvertBottom(e) {
  let t = e.id.split('_')[0]
  '' == e.value
    ? ((e.value = 'clicked'),
      (fsibObj[t] = 'invert'),
      $('#' + e.id)
        .children('img')
        .attr('src', 'images/invert-blue.svg'),
      $('#' + e.id).addClass('textStyleSelected'))
    : ((e.value = ''),
      (fsibObj[t] = 'normal'),
      $('#' + e.id)
        .children('img')
        .attr('src', 'images/invert.svg'),
      $('#' + e.id).removeClass('textStyleSelected'))
}
function fontWhitenBottom(e) {
  let t = e.id.split('_')[0]
  '' == e.value
    ? ((e.value = 'clicked'),
      (fswbObj[t] = 'whiten'),
      $('#' + e.id)
        .children('img')
        .attr('src', 'images/text-whiten-blue.svg'),
      $('#' + e.id).addClass('textStyleSelected'))
    : ((e.value = ''),
      (fswbObj[t] = 'normal'),
      $('#' + e.id)
        .children('img')
        .attr('src', 'images/text-whiten.svg'),
      $('#' + e.id).removeClass('textStyleSelected'))
}
function displayTopTextLayerId(e) {
  0 == document.getElementById(e).value.length
    ? (document.getElementById(topTextLayerId).innerHTML =
        document.getElementById(e).placeholder)
    : (document.getElementById(topTextLayerId).innerHTML =
        document.getElementById(e).value),
    0 == document.getElementById(e).value.length
      ? (document.getElementById(topTextLayerId).innerHTML =
          document.getElementById(e).placeholder)
      : (document.getElementById(topTextLayerId).innerHTML =
          document.getElementById(e).value),
    0 == document.getElementById(e).value.length
      ? (document.getElementById(topTextLayerId).innerHTML =
          document.getElementById(e).placeholder)
      : (document.getElementById(topTextLayerId).innerHTML =
          document.getElementById(e).value)
}
function fontStyleBoldTop(e) {
  let t = e.id.split('_')[0]
  '' == e.value
    ? ((e.value = 'clicked'),
      'italic' == fsbtObj[t]
        ? (fsbtObj[t] = 'bold italic')
        : (fsbtObj[t] = 'bold'),
      $('#' + e.id)
        .children('img')
        .attr('src', 'images/bold-blue.svg'),
      $('#' + e.id).addClass('textStyleSelected'))
    : ((e.value = ''),
      'bold italic' == fsbtObj[t]
        ? (fsbtObj[t] = 'italic')
        : ((fsbtObj[t] = 'normal'),
          $('#' + e.id).addClass('textStyleSelected')),
      $('#' + e.id)
        .children('img')
        .attr('src', 'images/bold.svg'),
      $('#' + e.id).removeClass('textStyleSelected'))
}
function fontStyleItalicTop(e) {
  let t = e.id.split('_')[0]
  '' == e.value
    ? ((e.value = 'clicked'),
      'bold' == fsbtObj[t]
        ? (fsbtObj[t] = 'bold italic')
        : (fsbtObj[t] = 'italic'),
      $('#' + e.id)
        .children('img')
        .attr('src', 'images/italic-blue.svg'),
      $('#' + e.id).addClass('textStyleSelected'))
    : ((e.value = ''),
      'bold italic' == fsbtObj[t]
        ? (fsbtObj[t] = 'bold')
        : (fsbtObj[t] = 'normal'),
      $('#' + e.id)
        .children('img')
        .attr('src', 'images/italic.svg'),
      $('#' + e.id).removeClass('textStyleSelected'))
}
function fontTransformTop(e) {
  let t = e.id.split('_')[0]
  '' == e.value
    ? ((e.value = 'clicked'),
      (fsttObj[t] = 'upperCase'),
      $('#' + e.id)
        .children('img')
        .attr('src', 'images/tt-blue.svg'),
      $('#' + e.id).addClass('textStyleSelected'))
    : ((e.value = ''),
      (fsttObj[t] = 'lowerCase'),
      $('#' + e.id)
        .children('img')
        .attr('src', 'images/textTransform.svg'),
      $('#' + e.id).removeClass('textStyleSelected'))
}
function fontInvertTop(e) {
  let t = e.id.split('_')[0]
  '' == e.value
    ? ((e.value = 'clicked'),
      (fsitObj[t] = 'invert'),
      $('#' + e.id)
        .children('img')
        .attr('src', 'images/invert-blue.svg'),
      $('#' + e.id).addClass('textStyleSelected'))
    : ((e.value = ''),
      (fsitObj[t] = 'normal'),
      $('#' + e.id)
        .children('img')
        .attr('src', 'images/invert.svg'),
      $('#' + e.id).removeClass('textStyleSelected'))
}
function fontWhitenTop(e) {
  let t = e.id.split('_')[0]
  '' == e.value
    ? ((e.value = 'clicked'),
      (fswtObj[t] = 'whiten'),
      $('#' + e.id)
        .children('img')
        .attr('src', 'images/text-whiten-blue.svg'),
      $('#' + e.id).addClass('textStyleSelected'))
    : ((e.value = ''),
      (fswtObj[t] = 'normal'),
      $('#' + e.id)
        .children('img')
        .attr('src', 'images/text-whiten.svg'),
      $('#' + e.id).removeClass('textStyleSelected'))
}
function displayRectTextLayerId(e) {
  0 == document.getElementById(e).value.length
    ? (document.getElementById(rectTextLayerId).innerHTML =
        document.getElementById(e).placeholder)
    : (document.getElementById(rectTextLayerId).innerHTML =
        document.getElementById(e).value),
    0 == document.getElementById(e).value.length
      ? (document.getElementById(rectTextLayerId).innerHTML =
          document.getElementById(e).placeholder)
      : (document.getElementById(rectTextLayerId).innerHTML =
          document.getElementById(e).value),
    0 == document.getElementById(e).value.length
      ? (document.getElementById(rectTextLayerId).innerHTML =
          document.getElementById(e).placeholder)
      : (document.getElementById(rectTextLayerId).innerHTML =
          document.getElementById(e).value),
    0 == document.getElementById(e).value.length
      ? (document.getElementById(rectTextLayerId).innerHTML =
          document.getElementById(e).placeholder)
      : (document.getElementById(rectTextLayerId).innerHTML =
          document.getElementById(e).value)
}
function fontStyleBoldRect(e) {
  let t = e.id.split('_')[0]
  '' == e.value
    ? ((e.value = 'clicked'),
      'italic' == fsbrObj[t]
        ? (fsbrObj[t] = 'bold italic')
        : (fsbrObj[t] = 'bold'),
      $('#' + e.id)
        .children('img')
        .attr('src', 'images/bold-blue.svg'),
      $('#' + e.id).addClass('textStyleSelected'))
    : ((e.value = ''),
      'bold italic' == fsbrObj[t]
        ? (fsbrObj[t] = 'italic')
        : ((fsbrObj[t] = 'normal'),
          $('#' + e.id).addClass('textStyleSelected')),
      $('#' + e.id)
        .children('img')
        .attr('src', 'images/bold.svg'),
      $('#' + e.id).removeClass('textStyleSelected'))
}
function fontStyleItalicRect(e) {
  let t = e.id.split('_')[0]
  '' == e.value
    ? ((e.value = 'clicked'),
      'bold' == fsbrObj[t]
        ? (fsbrObj[t] = 'bold italic')
        : (fsbrObj[t] = 'italic'),
      $('#' + e.id)
        .children('img')
        .attr('src', 'images/italic-blue.svg'),
      $('#' + e.id).addClass('textStyleSelected'))
    : ((e.value = ''),
      'bold italic' == fsbrObj[t]
        ? (fsbrObj[t] = 'bold')
        : (fsbrObj[t] = 'normal'),
      $('#' + e.id)
        .children('img')
        .attr('src', 'images/italic.svg'),
      $('#' + e.id).removeClass('textStyleSelected'))
}
function fontTransformRect(e) {
  let t = e.id.split('_')[0]
  '' == e.value
    ? ((e.value = 'clicked'),
      (fstrObj[t] = 'upperCase'),
      $('#' + e.id)
        .children('img')
        .attr('src', 'images/tt-blue.svg'),
      $('#' + e.id).addClass('textStyleSelected'))
    : ((e.value = ''),
      (fstrObj[t] = 'lowerCase'),
      $('#' + e.id)
        .children('img')
        .attr('src', 'images/textTransform.svg'),
      $('#' + e.id).removeClass('textStyleSelected'))
}
function fontInvertRect(e) {
  let t = e.id.split('_')[0]
  '' == e.value
    ? ((e.value = 'clicked'),
      (fsirObj[t] = 'invert'),
      $('#' + e.id)
        .children('img')
        .attr('src', 'images/invert-blue.svg'),
      $('#' + e.id).addClass('textStyleSelected'))
    : ((e.value = ''),
      (fsirObj[t] = 'normal'),
      $('#' + e.id)
        .children('img')
        .attr('src', 'images/invert.svg'),
      $('#' + e.id).removeClass('textStyleSelected'))
}
function fontWhitenRect(e) {
  let t = e.id.split('_')[0]
  '' == e.value
    ? ((e.value = 'clicked'),
      (fswrObj[t] = 'whiten'),
      $('#' + e.id)
        .children('img')
        .attr('src', 'images/text-whiten-blue.svg'),
      $('#' + e.id).addClass('textStyleSelected'))
    : ((e.value = ''),
      (fswrObj[t] = 'normal'),
      $('#' + e.id)
        .children('img')
        .attr('src', 'images/text-whiten.svg'),
      $('#' + e.id).removeClass('textStyleSelected'))
}
function displayOvalTextLayerId(e) {
  document.getElementById(ovalTextLayerId).innerHTML =
    document.getElementById(e).value
}
function fontStyleBoldOval(e) {
  let t = e.id.split('_')[0]
  '' == e.value
    ? ((e.value = 'clicked'),
      'italic' == fsboObj[t]
        ? (fsboObj[t] = 'bold italic')
        : (fsboObj[t] = 'bold'),
      $('#' + e.id)
        .children('img')
        .attr('src', 'images/bold-blue.svg'),
      $('#' + e.id).addClass('textStyleSelected'))
    : ((e.value = ''),
      'bold italic' == fsboObj[t]
        ? (fsboObj[t] = 'italic')
        : ((fsboObj[t] = 'normal'),
          $('#' + e.id).addClass('textStyleSelected')),
      $('#' + e.id)
        .children('img')
        .attr('src', 'images/bold.svg'),
      $('#' + e.id).removeClass('textStyleSelected'))
}
function fontStyleItalicOval(e) {
  let t = e.id.split('_')[0]
  '' == e.value
    ? ((e.value = 'clicked'),
      'bold' == fsboObj[t]
        ? (fsboObj[t] = 'bold italic')
        : (fsboObj[t] = 'italic'),
      $('#' + e.id)
        .children('img')
        .attr('src', 'images/italic-blue.svg'),
      $('#' + e.id).addClass('textStyleSelected'))
    : ((e.value = ''),
      'bold italic' == fsboObj[t]
        ? (fsboObj[t] = 'bold')
        : (fsboObj[t] = 'normal'),
      $('#' + e.id)
        .children('img')
        .attr('src', 'images/italic.svg'),
      $('#' + e.id).removeClass('textStyleSelected'))
}
function fontTransformOval(e) {
  let t = e.id.split('_')[0]
  '' == e.value
    ? ((e.value = 'clicked'),
      (fstoObj[t] = 'upperCase'),
      $('#' + e.id)
        .children('img')
        .attr('src', 'images/tt-blue.svg'),
      $('#' + e.id).addClass('textStyleSelected'))
    : ((e.value = ''),
      (fstoObj[t] = 'lowerCase'),
      $('#' + e.id)
        .children('img')
        .attr('src', 'images/textTransform.svg'),
      $('#' + e.id).removeClass('textStyleSelected'))
}
function fontInvertOval(e) {
  let t = e.id.split('_')[0]
  '' == e.value
    ? ((e.value = 'clicked'),
      (fsioObj[t] = 'invert'),
      $('#' + e.id)
        .children('img')
        .attr('src', 'images/invert-blue.svg'),
      $('#' + e.id).addClass('textStyleSelected'))
    : ((e.value = ''),
      (fsioObj[t] = 'normal'),
      $('#' + e.id)
        .children('img')
        .attr('src', 'images/invert.svg'),
      $('#' + e.id).removeClass('textStyleSelected'))
}
function fontWhitenOval(e) {
  let t = e.id.split('_')[0]
  '' == e.value
    ? ((e.value = 'clicked'),
      (fwoObj[t] = 'whiten'),
      $('#' + e.id)
        .children('img')
        .attr('src', 'images/text-whiten-blue.svg'),
      $('#' + e.id).addClass('textStyleSelected'))
    : ((e.value = ''),
      (fwoObj[t] = 'normal'),
      $('#' + e.id)
        .children('img')
        .attr('src', 'images/text-whiten.svg'),
      $('#' + e.id).removeClass('textStyleSelected'))
}
function displayQuadTextLayerId(e) {
  0 == document.getElementById(e).value.length
    ? (document.getElementById(quadTextLayerId).innerHTML =
        document.getElementById(e).placeholder)
    : (document.getElementById(quadTextLayerId).innerHTML =
        document.getElementById(e).value),
    0 == document.getElementById(e).value.length
      ? (document.getElementById(quadTextLayerId).innerHTML =
          document.getElementById(e).placeholder)
      : (document.getElementById(quadTextLayerId).innerHTML =
          document.getElementById(e).value),
    0 == document.getElementById(e).value.length
      ? (document.getElementById(quadTextLayerId).innerHTML =
          document.getElementById(e).placeholder)
      : (document.getElementById(quadTextLayerId).innerHTML =
          document.getElementById(e).value),
    0 == document.getElementById(e).value.length
      ? (document.getElementById(quadTextLayerId).innerHTML =
          document.getElementById(e).placeholder)
      : (document.getElementById(quadTextLayerId).innerHTML =
          document.getElementById(e).value)
}
function fontStyleBoldQuad(e) {
  let t = e.id.split('_')[0]
  '' == e.value
    ? ((e.value = 'clicked'),
      'italic' == fsbqObj[t]
        ? (fsbqObj[t] = 'bold italic')
        : (fsbqObj[t] = 'bold'),
      $('#' + e.id)
        .children('img')
        .attr('src', 'images/bold-blue.svg'),
      $('#' + e.id).addClass('textStyleSelected'))
    : ((e.value = ''),
      'bold italic' == fsbqObj[t]
        ? (fsbqObj[t] = 'italic')
        : (fsbqObj[t] = 'normal'),
      $('#' + e.id)
        .children('img')
        .attr('src', 'images/bold.svg'),
      $('#' + e.id).removeClass('textStyleSelected'))
}
function fontStyleItalicQuad(e) {
  let t = e.id.split('_')[0]
  '' == e.value
    ? ((e.value = 'clicked'),
      'bold' == fsbqObj[t]
        ? (fsbqObj[t] = 'bold italic')
        : (fsbqObj[t] = 'italic'),
      $('#' + e.id)
        .children('img')
        .attr('src', 'images/italic-blue.svg'),
      $('#' + e.id).addClass('textStyleSelected'))
    : ((e.value = ''),
      'bold italic' == fsbqObj[t]
        ? (fsbqObj[t] = 'bold')
        : (fsbqObj[t] = 'normal'),
      $('#' + e.id)
        .children('img')
        .attr('src', 'images/italic.svg'),
      $('#' + e.id).removeClass('textStyleSelected'))
}
function fontTransformQuad(e) {
  let t = e.id.split('_')[0]
  '' == e.value
    ? ((e.value = 'clicked'),
      (fstqObj[t] = 'upperCase'),
      $('#' + e.id)
        .children('img')
        .attr('src', 'images/tt-blue.svg'),
      $('#' + e.id).addClass('textStyleSelected'))
    : ((e.value = ''),
      (fstqObj[t] = 'lowerCase'),
      $('#' + e.id)
        .children('img')
        .attr('src', 'images/textTransform.svg'),
      $('#' + e.id).removeClass('textStyleSelected'))
}
function fontInvertQuad(e) {
  let t = e.id.split('_')[0]
  '' == e.value
    ? ((e.value = 'clicked'),
      (fsiqObj[t] = 'invert'),
      $('#' + e.id)
        .children('img')
        .attr('src', 'images/invert-blue.svg'),
      $('#' + e.id).addClass('textStyleSelected'))
    : ((e.value = ''),
      (fsiqObj[t] = 'normal'),
      $('#' + e.id)
        .children('img')
        .attr('src', 'images/invert.svg'),
      $('#' + e.id).removeClass('textStyleSelected'))
}
function fontWhitenQuad(e) {
  let t = e.id.split('_')[0]
  '' == e.value
    ? ((e.value = 'clicked'),
      (fwqObj[t] = 'whiten'),
      $('#' + e.id)
        .children('img')
        .attr('src', 'images/text-whiten-blue.svg'),
      $('#' + e.id).addClass('textStyleSelected'))
    : ((e.value = ''),
      (fwqObj[t] = 'normal'),
      $('#' + e.id)
        .children('img')
        .attr('src', 'images/text-whiten.svg'),
      $('#' + e.id).removeClass('textStyleSelected'))
}
function fillElements(e, t = null) {
  ;(color = t ? e : e.target.value),
    (r = parseInt(color.substr(1, 2), 16)),
    (g = parseInt(color.substr(3, 2), 16)),
    (b = parseInt(color.substr(5, 2), 16))
}
function enableNotif() {
  0 == canvasA.length
    ? ($('#exit-modal').modal('hide'),
      window.location.replace('http://stampjam.com'))
    : $('#exit-modal').modal('show')
}
function closeNotif() {
  $('#exit-modal').modal('hide')
}
function enableResetNotif() {
  $('#reset-modal').modal('show')
}
function closeResetNotif() {
  $('#reset-modal').modal('hide')
}
function enableTutorial() {
  $('#tutorial-modal').modal('show')
}
function closeTutorial() {
  $('#tutorial-modal').modal('hide')
}
function enableAddShape() {
  $('.left-bar .btn').removeClass('active'),
    $('#shapesBtn').addClass('active'),
    $('.add-tools,body').removeClass(
      'shapesBtn textBtn tempsBtn imagesBtn libraryBtn'
    ),
    $('.add-tools,body').addClass('shapesBtn')
}
function closeAddShape() {
  $('.left-bar .btn').removeClass('active'),
    $('.add-tools,body').removeClass('shapesBtn textBtn tempsBtn imagesBtn')
}
function enableAddText() {
  $('.left-bar .btn').removeClass('active'),
    $('#textBtn').addClass('active'),
    $('.add-tools,body').removeClass(
      'shapesBtn textBtn tempsBtn imagesBtn libraryBtn'
    ),
    $('.add-tools,body').addClass('textBtn')
}
function closeAddText() {
  $('.left-bar .btn').removeClass('active'),
    $('.add-tools,body').removeClass(
      'shapesBtn textBtn tempsBtn imagesBtn libraryBtn'
    )
}
function enableAddTemps() {
  $('.left-bar .btn').removeClass('active'),
    $('#tempsBtn').addClass('active'),
    $('.add-tools,body').removeClass(
      'shapesBtn textBtn tempsBtn imagesBtn libraryBtn'
    ),
    $('.add-tools,body').addClass('tempsBtn')
}
function closeAddLibrary() {
  $('.left-bar .btn').removeClass('active'),
    $('.add-tools,body').removeClass(
      'shapesBtn textBtn tempsBtn imagesBtn libraryBtn'
    )
}
function closeAddTemps() {
  $('.left-bar .btn').removeClass('active'),
    $('.add-tools,body').removeClass(
      'shapesBtn textBtn tempsBtn imagesBtn libraryBtn'
    )
}
function enableAddImages() {
  $('.left-bar .btn').removeClass('active'),
    $('#imagesBtn').addClass('active'),
    $('.add-tools,body').removeClass(
      'shapesBtn textBtn tempsBtn imagesBtn libraryBtn'
    ),
    $('.add-tools,body').addClass('imagesBtn')
}
function closeAddImages() {
  $('.left-bar .btn').removeClass('active'),
    $('.add-tools,body').removeClass(
      'shapesBtn textBtn tempsBtn imagesBtn libraryBtn'
    )
}
function customShape(e, t, l, n) {
  let o = TWO_PI / n
  beginShape()
  for (let n = 0; n < TWO_PI; n += o) {
    let o = e + cos(n) * l,
      a = t + sin(n) * l
    vertex(o, a)
  }
  endShape(CLOSE)
}
function star(e, t, l, n, o) {
  let a = TWO_PI / o,
    d = a / 2
  beginShape()
  for (let o = 0; o < TWO_PI; o += a) {
    let a = e + cos(o) * n,
      i = t + sin(o) * n
    vertex(a, i),
      (a = e + cos(o + d) * l),
      (i = t + sin(o + d) * l),
      vertex(a, i)
  }
  endShape(CLOSE)
}
function changeImgColor(e, t, l, n, o, a) {
  for (let d = 0; d < t; d++)
    for (let i = 0; i < l; i++) {
      let l = 4 * (i * t + d)
      ;(e[l + 0] = n), (e[l + 1] = o), (e[l + 2] = a)
    }
}
function setup() {
  $(function () {
    pixelDensity(2),
      (canvas = createCanvas(500, 500, P2D)),
      canvas.parent('canvas-wrapper'),
      (rad = min(500, 500) / 3),
      textAlign(CENTER),
      rectMode(CENTER)
  })
}
function loadImageOnClick(e) {
  window.innerWidth <= 800 && closeAddImages(), $('.loader').show()
  let t =
      e.target.src ??
      'https://imagedelivery.net/temUKYYt6UTKW4QZu-wRXg/892783f4-399a-4acd-a802-06a657f58700/v2',
    l = e.target.id
  $('.all-image-box').removeClass('active'),
    e.target.parentNode.parentNode.classList.add('active'),
    void 0 !== img[l] && (l += 1),
    loadImage(t, e => {
      ;(img[l] = e),
        passImg2Layer(t, null, null, null, l),
        imgOnCanvas(l),
        $('.loader').hide()
    })
}
function draw() {
  if ((clear(), noFill(), !0 === rectFlag))
    for (let e = canvasLen; e < elementCount + 1; e++)
      null != canvasA[e] &&
        'rect' == canvasA[e].objName &&
        canvasA[e].renderRect()
  if (!0 === circleFlag)
    for (let e = canvasLen; e < elementCount + 1; e++)
      null != canvasA[e] &&
        'circle' == canvasA[e].objName &&
        canvasA[e].renderCircle()
  if (!0 === squareFlag)
    for (let e = canvasLen; e < elementCount + 1; e++)
      null != canvasA[e] &&
        'square' == canvasA[e].objName &&
        canvasA[e].renderSquare()
  if (!0 === triangleFlag)
    for (let e = canvasLen; e < elementCount + 1; e++)
      null != canvasA[e] &&
        'triangle' == canvasA[e].objName &&
        canvasA[e].renderTriangle()
  if (!0 === pentagonFlag)
    for (let e = canvasLen; e < elementCount + 1; e++)
      null != canvasA[e] &&
        'pentagon' == canvasA[e].objName &&
        canvasA[e].renderPentagon()
  if (!0 === hexagramFlag)
    for (let e = canvasLen; e < elementCount + 1; e++)
      null != canvasA[e] &&
        'hexagram' == canvasA[e].objName &&
        canvasA[e].renderHexagram()
  if (!0 === starFlag)
    for (let e = canvasLen; e < elementCount + 1; e++)
      null != canvasA[e] &&
        'star' == canvasA[e].objName &&
        canvasA[e].renderStar()
  if (!0 === octagonFlag)
    for (let e = canvasLen; e < elementCount + 1; e++)
      null != canvasA[e] &&
        'octagon' == canvasA[e].objName &&
        canvasA[e].renderOctagon()
  if (!0 === hexagonFlag)
    for (let e = canvasLen; e < elementCount + 1; e++)
      null != canvasA[e] &&
        'hexagon' == canvasA[e].objName &&
        canvasA[e].renderHexagon()
  if (!0 === nonagonFlag)
    for (let e = canvasLen; e < elementCount + 1; e++)
      null != canvasA[e] &&
        'nonagon' == canvasA[e].objName &&
        canvasA[e].renderNonagon()
  if (!0 === twoSixFlag)
    for (let e = canvasLen; e < elementCount + 1; e++)
      null != canvasA[e] &&
        'twoSix' == canvasA[e].objName &&
        canvasA[e].renderTwoSix()
  if (!0 === quadFlag)
    for (let e = canvasLen; e < elementCount + 1; e++)
      null != canvasA[e] &&
        'quad' == canvasA[e].objName &&
        canvasA[e].renderQuad()
  if (!0 === ovalFlag)
    for (let e = canvasLen; e < elementCount + 1; e++)
      null != canvasA[e] &&
        'oval' == canvasA[e].objName &&
        canvasA[e].renderOval()
  if (!0 === lineFlag)
    for (let e = canvasLen; e < elementCount + 1; e++)
      null != canvasA[e] &&
        'line' == canvasA[e].objName &&
        canvasA[e].renderLine()
  if (!0 === cubeFlag)
    for (let e = canvasLen; e < elementCount + 1; e++)
      null != canvasA[e] &&
        'cube' == canvasA[e].objName &&
        canvasA[e].renderCube()
  if (!0 === circularTextFlag)
    for (let e = canvasLen; e < elementCount + 1; e++)
      null != canvasA[e] &&
        'circularText' == canvasA[e].objName &&
        canvasA[e].renderCircularText(canvasA[e].id.match(/(\d+)/)[0], e)
  if (!0 === centerTextFlag)
    for (let e = canvasLen; e < elementCount + 1; e++)
      null != canvasA[e] &&
        'centerText' == canvasA[e].objName &&
        canvasA[e].renderCenterText(canvasA[e].id.match(/(\d+)/)[0], e)
  if (!0 === topTextFlag)
    for (let e = canvasLen; e < elementCount + 1; e++)
      null != canvasA[e] &&
        'topText' == canvasA[e].objName &&
        canvasA[e].renderTopText(canvasA[e].id.match(/(\d+)/)[0], e)
  if (!0 === bottomTextFlag)
    for (let e = canvasLen; e < elementCount + 1; e++)
      null != canvasA[e] &&
        'bottomText' == canvasA[e].objName &&
        canvasA[e].renderBottomText(canvasA[e].id.match(/(\d+)/)[0], e)
  if (!0 === rectTextFlag)
    for (let e = canvasLen; e < elementCount + 1; e++)
      null != canvasA[e] &&
        'rectText' == canvasA[e].objName &&
        canvasA[e].renderRectText(canvasA[e].id.match(/(\d+)/)[0], e)
  if (!0 === ovalTextFlag)
    for (let e = canvasLen; e < elementCount + 1; e++)
      null != canvasA[e] &&
        'ovalText' == canvasA[e].objName &&
        canvasA[e].renderOvalText(canvasA[e].id.match(/(\d+)/)[0], e)
  if (!0 === quadTextFlag)
    for (let e = canvasLen; e < elementCount + 1; e++)
      null != canvasA[e] &&
        'quadText' == canvasA[e].objName &&
        canvasA[e].renderQuadText(canvasA[e].id.match(/(\d+)/)[0], e)
  if (!0 === drawImageFlag)
    for (let e = canvasLen; e < elementCount + 1; e++)
      null != canvasA[e] &&
        'image' == canvasA[e].objName &&
        canvasA[e].renderPNG(canvasA[e].id.match(/(\d+)/)[0], e)
}
function passDefaultVal(e, t) {
  if (e.value.length <= 0) {
    switch (t) {
      case 'scale':
        document.getElementById(e.id).value = 80
        break
      case 'stroke':
        document.getElementById(e.id).value = 6
        break
      case 'lineBreak':
        document.getElementById(e.id).value = 0
        break
      case 'hp':
        document.getElementById(e.id).value = 50
        break
      case 'vp':
        document.getElementById(e.id).value = 50
        break
      case 'rotation':
        document.getElementById(e.id).value = 0
        break
      case 'imgSize':
        document.getElementById(e.id).value = 50
        break
      case 'imgHP':
        document.getElementById(e.id).value = 50
        break
      case 'imgVP':
        document.getElementById(e.id).value = 50
        break
      case 'imgRotation':
        document.getElementById(e.id).value = 0
        break
      case 'circularFs':
        document.getElementById(e.id).value = 10
        break
      case 'circularLs':
        document.getElementById(e.id).value = 100
        break
      case 'circularRadius':
        document.getElementById(e.id).value = 60
        break
      case 'circularRotation':
        document.getElementById(e.id).value = 0
        break
      case 'lineFs':
        document.getElementById(e.id).value = 10
        break
      case 'lineHp':
        document.getElementById(e.id).value = 50
        break
      case 'lineVp':
        document.getElementById(e.id).value = 50
        break
      case 'lineRotation':
        document.getElementById(e.id).value = 0
        break
      case 'bottomFs':
        document.getElementById(e.id).value = 10
        break
      case 'bottomMargin':
        document.getElementById(e.id).value = 76
        break
      case 'topFs':
        document.getElementById(e.id).value = 10
        break
      case 'topMargin':
        document.getElementById(e.id).value = 72
        break
      case 'rectFs':
        document.getElementById(e.id).value = 10
        break
      case 'rectMargin':
        document.getElementById(e.id).value = 72
        break
      case 'quadFs':
        document.getElementById(e.id).value = 10
        break
      case 'quadMargin':
        document.getElementById(e.id).value = 56
        break
    }
    e.form.rangeAmt.value = e.value
  }
}
function passDefaultRange(e, t) {
  e.value > 100 && 'scale' == t && (document.getElementById(e.id).value = 100),
    e.value > 100 &&
      'stroke' == t &&
      (document.getElementById(e.id).value = 100),
    e.value > 99 &&
      'lineBreak' == t &&
      (document.getElementById(e.id).value = 99),
    e.value > 100 && 'hp' == t && (document.getElementById(e.id).value = 100),
    e.value > 100 && 'vp' == t && (document.getElementById(e.id).value = 100),
    e.value > 100 &&
      'rotation' == t &&
      (document.getElementById(e.id).value = 100),
    e.value > 100 &&
      'imgSize' == t &&
      (document.getElementById(e.id).value = 100),
    e.value > 100 &&
      'imgHP' == t &&
      (document.getElementById(e.id).value = 100),
    e.value > 100 &&
      'imgVP' == t &&
      (document.getElementById(e.id).value = 100),
    e.value > 100 &&
      'imgRotation' == t &&
      (document.getElementById(e.id).value = 100),
    e.value > 100 &&
      'circularFs' == t &&
      (document.getElementById(e.id).value = 80),
    e.value > 100 &&
      'circularLs' == t &&
      (document.getElementById(e.id).value = 100),
    e.value > 100 &&
      'circularRadius' == t &&
      (document.getElementById(e.id).value = 100),
    e.value > 100 &&
      'circularRotation' == t &&
      (document.getElementById(e.id).value = 100),
    e.value > 100 &&
      'lineFs' == t &&
      (document.getElementById(e.id).value = 80),
    e.value > 100 &&
      'lineHp' == t &&
      (document.getElementById(e.id).value = 100),
    e.value > 100 &&
      'lineVp' == t &&
      (document.getElementById(e.id).value = 100),
    e.value > 100 &&
      'lineRotation' == t &&
      (document.getElementById(e.id).value = 100),
    e.value > 100 &&
      'bottomFs' == t &&
      (document.getElementById(e.id).value = 80),
    e.value > 100 &&
      'bottomMargin' == t &&
      (document.getElementById(e.id).value = 100),
    e.value > 100 && 'topFs' == t && (document.getElementById(e.id).value = 80),
    e.value > 100 &&
      'topMargin' == t &&
      (document.getElementById(e.id).value = 100),
    e.value > 100 &&
      'rectFs' == t &&
      (document.getElementById(e.id).value = 80),
    e.value > 100 &&
      'rectMargin' == t &&
      (document.getElementById(e.id).value = 100),
    e.value > 100 &&
      'quadFs' == t &&
      (document.getElementById(e.id).value = 80),
    e.value > 100 &&
      'quadMargin' == t &&
      (document.getElementById(e.id).value = 100),
    (e.form.rangeAmt.value = e.value)
}
0 == canvasA.length &&
  ((document.getElementById('resetField').style.pointerEvents = 'none'),
  (document.getElementById('docView').style.pointerEvents = 'none'),
  (document.getElementById('delete').style.pointerEvents = 'none'),
  (document.getElementById('fillBox').style.pointerEvents = 'none')),
  $('.light-theme').click(function () {
    $('body').attr('data-theme', 'darktheme'),
      (document.getElementById('canvas-wrapper').style.backgroundImage =
        'url(images/grid-grey.svg)')
  }),
  $('.dark-theme').click(function () {
    $('body').attr('data-theme', 'lighttheme'),
      (document.getElementById('canvas-wrapper').style.backgroundImage =
        'url(images/grid-grey.svg)')
  }),
  $('#mylibrarybtn').click(function () {
    $('.left-bar .btn').removeClass('active'),
      $('#mylibrarybtn').addClass('active'),
      $('.add-tools,body').removeClass(
        'shapesBtn textBtn tempsBtn imagesBtn libraryBtn'
      ),
      $('.add-tools,body').addClass('libraryBtn')
  })
class element {
  constructor(e, t, l, n, o, a) {
    ;(this.id = e),
      (this.hideFlag = !0),
      (this.objName = t),
      (this.name = l),
      (this.object = n),
      (this.imgSrc = o),
      (this.imgNum = 'image' == t && null != a ? a : img.length - 1),
      'image' == this.objName &&
        (this.countA || 0 == this.countA ? this.countA++ : (this.countA = 0))
  }
  renderRect() {
    let e = document.getElementById(this.id + 'scale').value,
      t = document.getElementById(this.id + 'stroke').value,
      l = document.getElementById(this.id + 'lineBreak').value,
      n = 100 - 1 * l
    push(),
      this.hideFlag
        ? highlightLayerFlag || this.id == highlightLayerId
          ? stroke(r, g, b)
          : stroke(217, 217, 217)
        : noStroke(),
      translate(250, 250),
      strokeCap(SQUARE),
      strokeWeight(t),
      100 == n
        ? drawingContext.setLineDash([l, l])
        : drawingContext.setLineDash([n, n]),
      rect(0, 0, 4 * e, 2 * e),
      pop()
  }
  renderCircle() {
    let e = document.getElementById(this.id + 'scale').value,
      t = document.getElementById(this.id + 'stroke').value,
      l = document.getElementById(this.id + 'lineBreak').value,
      n = 100 - 1 * l
    push(),
      this.hideFlag
        ? highlightLayerFlag || this.id == highlightLayerId
          ? stroke(r, g, b)
          : stroke(217, 217, 217)
        : noStroke(),
      strokeCap(SQUARE),
      strokeWeight(t),
      100 == n
        ? drawingContext.setLineDash([l, l])
        : drawingContext.setLineDash([n, n]),
      circle(250, 250, 4 * e),
      pop()
  }
  renderSquare() {
    let e = document.getElementById(this.id + 'scale').value,
      t = document.getElementById(this.id + 'stroke').value,
      l = document.getElementById(this.id + 'lineBreak').value,
      n = 100 - 1 * l
    push(),
      this.hideFlag
        ? highlightLayerFlag || this.id == highlightLayerId
          ? stroke(r, g, b)
          : stroke(217, 217, 217)
        : noStroke(),
      translate(250, 250),
      strokeCap(SQUARE),
      strokeWeight(t),
      100 == n
        ? drawingContext.setLineDash([l, l])
        : drawingContext.setLineDash([n, n]),
      rect(0, 0, 3.96 * e, 3.96 * e),
      pop()
  }
  renderTriangle() {
    let e = document.getElementById(this.id + 'scale').value,
      t = document.getElementById(this.id + 'stroke').value,
      l = document.getElementById(this.id + 'lineBreak').value,
      n = 100 - 1 * l,
      o = -1.68 * e,
      a = e,
      d = -2 * e,
      i = 1.68 * e,
      c = e
    push(),
      this.hideFlag
        ? highlightLayerFlag || this.id == highlightLayerId
          ? stroke(r, g, b)
          : stroke(217, 217, 217)
        : noStroke(),
      translate(250, 250),
      strokeCap(SQUARE),
      strokeWeight(t),
      100 == n
        ? drawingContext.setLineDash([l, l])
        : drawingContext.setLineDash([n, n]),
      triangle(o, a, 0, d, i, c),
      pop()
  }
  renderHexagram() {
    let e = document.getElementById(this.id + 'scale').value,
      t = document.getElementById(this.id + 'stroke').value,
      l = document.getElementById(this.id + 'lineBreak').value,
      n = 100 - 1 * l
    push(),
      this.hideFlag
        ? highlightLayerFlag || this.id == highlightLayerId
          ? stroke(r, g, b)
          : stroke(217, 217, 217)
        : noStroke(),
      translate(250, 250),
      strokeCap(SQUARE),
      strokeWeight(t),
      100 == n
        ? drawingContext.setLineDash([l, l])
        : drawingContext.setLineDash([n, n]),
      rotate(62.3),
      star(0, 0, 1.15 * e, 1.98 * e, 6),
      pop()
  }
  renderPentagon() {
    let e = document.getElementById(this.id + 'scale').value,
      t = document.getElementById(this.id + 'stroke').value,
      l = document.getElementById(this.id + 'lineBreak').value,
      n = 100 - 1 * l
    push(),
      this.hideFlag
        ? highlightLayerFlag || this.id == highlightLayerId
          ? stroke(r, g, b)
          : stroke(217, 217, 217)
        : noStroke(),
      translate(250, 250),
      strokeCap(SQUARE),
      strokeWeight(t),
      rotate(60),
      100 == n
        ? drawingContext.setLineDash([l, l])
        : drawingContext.setLineDash([n, n]),
      customShape(0, 0, 2 * e, 5),
      pop()
  }
  renderNonagon() {
    let e = document.getElementById(this.id + 'scale').value,
      t = document.getElementById(this.id + 'stroke').value,
      l = document.getElementById(this.id + 'lineBreak').value,
      n = 100 - 1 * l
    push(),
      this.hideFlag
        ? highlightLayerFlag || this.id == highlightLayerId
          ? stroke(r, g, b)
          : stroke(217, 217, 217)
        : noStroke(),
      translate(250, 250),
      strokeCap(SQUARE),
      strokeWeight(t),
      100 == n
        ? drawingContext.setLineDash([l, l])
        : drawingContext.setLineDash([n, n]),
      rotate(18.002),
      star(0, 0, 1.5 * e, 2 * e, 9),
      pop()
  }
  renderHexagon() {
    let e = document.getElementById(this.id + 'scale').value,
      t = document.getElementById(this.id + 'stroke').value,
      l = document.getElementById(this.id + 'lineBreak').value,
      n = 100 - 1 * l
    push(),
      this.hideFlag
        ? highlightLayerFlag || this.id == highlightLayerId
          ? stroke(r, g, b)
          : stroke(217, 217, 217)
        : noStroke(),
      translate(250, 250),
      strokeCap(SQUARE),
      strokeWeight(t),
      100 == n
        ? drawingContext.setLineDash([l, l])
        : drawingContext.setLineDash([n, n]),
      customShape(0, 0, 2 * e, 6),
      pop()
  }
  renderStar() {
    let e = document.getElementById(this.id + 'scale').value,
      t = document.getElementById(this.id + 'stroke').value,
      l = document.getElementById(this.id + 'lineBreak').value,
      n = 100 - 1 * l
    push(),
      this.hideFlag
        ? highlightLayerFlag || this.id == highlightLayerId
          ? stroke(r, g, b)
          : stroke(217, 217, 217)
        : noStroke(),
      translate(250, 250),
      strokeCap(SQUARE),
      strokeWeight(t),
      100 == n
        ? drawingContext.setLineDash([l, l])
        : drawingContext.setLineDash([n, n]),
      rotate(60),
      star(0, 0, 0.95 * e, 2 * e, 5),
      pop()
  }
  renderOctagon() {
    let e = document.getElementById(this.id + 'scale').value,
      t = document.getElementById(this.id + 'stroke').value,
      l = document.getElementById(this.id + 'lineBreak').value,
      n = 100 - 1 * l
    push(),
      this.hideFlag
        ? highlightLayerFlag || this.id == highlightLayerId
          ? stroke(r, g, b)
          : stroke(217, 217, 217)
        : noStroke(),
      translate(250, 250),
      strokeCap(SQUARE),
      strokeWeight(t),
      100 == n
        ? drawingContext.setLineDash([l, l])
        : drawingContext.setLineDash([n, n]),
      rotate(75),
      customShape(0, 0, 2.15 * e, 8),
      pop()
  }
  renderTwoSix() {
    let e = document.getElementById(this.id + 'scale').value,
      t = document.getElementById(this.id + 'stroke').value,
      l = document.getElementById(this.id + 'lineBreak').value,
      n = 100 - 1 * l
    push(),
      this.hideFlag
        ? highlightLayerFlag || this.id == highlightLayerId
          ? stroke(r, g, b)
          : stroke(217, 217, 217)
        : noStroke(),
      translate(250, 250),
      strokeCap(SQUARE),
      strokeWeight(t),
      100 == n
        ? drawingContext.setLineDash([l, l])
        : drawingContext.setLineDash([n, n]),
      rotate(54.975),
      star(0, 0, 1.76 * e, 2 * e, 18),
      pop()
  }
  renderQuad() {
    let e = document.getElementById(this.id + 'scale').value,
      t = document.getElementById(this.id + 'stroke').value,
      l = document.getElementById(this.id + 'lineBreak').value,
      n = 100 - 1 * l
    push(),
      this.hideFlag
        ? highlightLayerFlag || this.id == highlightLayerId
          ? stroke(r, g, b)
          : stroke(217, 217, 217)
        : noStroke(),
      translate(250, 250),
      strokeCap(SQUARE),
      strokeWeight(t),
      100 == n
        ? drawingContext.setLineDash([l, l])
        : drawingContext.setLineDash([n, n]),
      customShape(0, 0, 2 * e, 4),
      pop()
  }
  renderOval() {
    let e = document.getElementById(this.id + 'scale').value,
      t = document.getElementById(this.id + 'stroke').value,
      l = document.getElementById(this.id + 'lineBreak').value,
      n = 100 - 1 * l
    push(),
      this.hideFlag
        ? highlightLayerFlag || this.id == highlightLayerId
          ? stroke(r, g, b)
          : stroke(217, 217, 217)
        : noStroke(),
      translate(250, 250),
      strokeCap(SQUARE),
      strokeWeight(t),
      100 == n
        ? drawingContext.setLineDash([l, l])
        : drawingContext.setLineDash([n, n]),
      ellipse(0, 0, 4 * e, 2 * e),
      pop()
  }
  renderLine() {
    let e = document.getElementById(this.id + 'scale').value,
      t = document.getElementById(this.id + 'stroke').value,
      l = document.getElementById(this.id + 'lineBreak').value,
      n = document.getElementById(this.id + 'rotation').value,
      o = document.getElementById(this.id + 'vp').value,
      a = document.getElementById(this.id + 'hp').value,
      d = 100 - 1 * l,
      i = 200,
      c = 2 * -e + (4 * a - i),
      s = 4 * o - i,
      m = 2 * e + (4 * a - i),
      u = 4 * o - i
    push(),
      this.hideFlag
        ? highlightLayerFlag || this.id == highlightLayerId
          ? stroke(r, g, b)
          : stroke(217, 217, 217)
        : noStroke(),
      translate(250, 250),
      strokeCap(SQUARE),
      strokeWeight(t),
      100 == d
        ? drawingContext.setLineDash([l, l])
        : drawingContext.setLineDash([d, d]),
      rotate(n / 15.92),
      line(c, s, m, u),
      pop()
  }
  renderCube() {
    let e = document.getElementById(this.id + 'scale').value,
      t = document.getElementById(this.id + 'stroke').value,
      l = document.getElementById(this.id + 'lineBreak').value,
      n = 100 - 1 * l
    push(),
      this.hideFlag
        ? highlightLayerFlag || this.id == highlightLayerId
          ? stroke(r, g, b)
          : stroke(217, 217, 217)
        : noStroke(),
      translate(250, 250),
      strokeCap(SQUARE),
      strokeWeight(t),
      100 == n
        ? drawingContext.setLineDash([l, l])
        : drawingContext.setLineDash([n, n]),
      rotate(62.3),
      star(0, 0, 1.7 * e, 1.98 * e, 6),
      pop()
  }
  renderCircularText(e, t) {
    smooth()
    let l,
      n = document.getElementById(this.id + 'circularTextFontSize').value,
      o = document.getElementById(this.id + 'circularTextSpacing').value,
      a = document.getElementById(this.id + 'circularTextRadius').value,
      d = document.getElementById(this.id + 'circularTextRotation').value,
      i = document.getElementById(this.id + 'circularTextFontSelect').value,
      c = document.getElementById('objectNo' + e + 'circleText').value
    if (
      (null != this.object && 0 == c.length && (c = this.object.textInput),
      0 == c.length
        ? ((l = document.getElementById(
            'objectNo' + e + 'circleText'
          ).placeholder),
          showEnterText())
        : ((l = document.getElementById('objectNo' + e + 'circleText').value),
          document
            .querySelector('#dwnBtnFree')
            .addEventListener('click', function () {
              document.getElementById('noText').style.display = 'none'
            }),
          showPricingAfterEnterText()),
      containsHindi(l) || containsArabic(l) || containsUrdu(l))
    ) {
      let e = ''
      e =
        containsArabic(l) || containsUrdu(l)
          ? l.split(' ').reverse()
          : l.split(' ')
      let c = radians(3.6 * o) / e.length
      push(), textFont(i), translate(250, 250), rotate(radians(3.6 * d))
      for (let l = 0; l < e.length; l++)
        this.hideFlag
          ? highlightLayerFlag || this.id == highlightLayerId
            ? (stroke(r, g, b), fill(r, g, b))
            : (stroke(217, 217, 217), fill(217, 217, 217))
          : (noFill(), noStroke()),
          Object.keys(fwcObj).forEach(e => {
            canvasA[t].id == e && 'whiten' == fwcObj[e] && fill(255, 255, 255)
          }),
          push(),
          textSize(+Number(n)),
          Object.keys(fsbcObj).forEach(e => {
            canvasA[t].id == e && textStyle(fsbcObj[e])
          }),
          Object.keys(fsiObj).forEach(n => {
            canvasA[t]?.id == n &&
              void 0 !== canvasA[t] &&
              ('invert' == fsiObj[n]
                ? (rotate(-l * c - 0.66),
                  rotate(a / 666),
                  text(e[l], 0, 2.24 * a))
                : (rotate(l * c), rotate(a / 666), text(e[l], 0, -2 * a)))
          }),
          pop()
      return void pop()
    }
    let s = l.split(' ').length
    ;(l = s < 2 ? l : ' ' + l),
      Object.keys(fstcObj).forEach(e => {
        canvasA[t].id == e && 'upperCase' == fstcObj[e] && (l = l.toUpperCase())
      })
    let m = radians(3.6 * o) / l.length
    push(), textFont(i), translate(250, 250), rotate(radians(3.6 * d))
    for (let e = 0; e < l.length; e++)
      this.hideFlag
        ? highlightLayerFlag || this.id == highlightLayerId
          ? (stroke(r, g, b), fill(r, g, b))
          : (stroke(217, 217, 217), fill(217, 217, 217))
        : (noFill(), noStroke()),
        Object.keys(fwcObj).forEach(e => {
          canvasA[t].id == e && 'whiten' == fwcObj[e] && fill(255, 255, 255)
        }),
        push(),
        textSize(+Number(n)),
        Object.keys(fsbcObj).forEach(e => {
          canvasA[t].id == e && textStyle(fsbcObj[e])
        }),
        Object.keys(fsiObj).forEach(n => {
          canvasA[t]?.id == n &&
            void 0 !== canvasA[t] &&
            ('invert' == fsiObj[n]
              ? (rotate(-e * m - 0.66),
                rotate(a / 666),
                text(l[e], 0, 2.24 * a))
              : (rotate(e * m), rotate(a / 666), text(l[e], 0, -2 * a)))
        }),
        pop()
    pop()
  }
  renderCenterText(e, t) {
    let l,
      n = document.getElementById(this.id + 'centerTextFontSelect').value,
      o = document.getElementById(this.id + 'centerTextFontSize').value,
      a = document.getElementById(this.id + 'centerTextHorizontal').value,
      d = document.getElementById(this.id + 'centerTextVertical').value,
      i = document.getElementById(this.id + 'centerTextRotation').value
    0 == document.getElementById('objectNo' + e + 'centerText').value.length
      ? ((l = document.getElementById(
          'objectNo' + e + 'centerText'
        ).placeholder),
        showEnterText())
      : ((l = document.getElementById('objectNo' + e + 'centerText').value),
        document
          .querySelector('#dwnBtnFree')
          .addEventListener('click', function () {
            document.getElementById('noText').style.display = 'none'
          }),
        showPricingAfterEnterText()),
      Object.keys(fstlObj).forEach(e => {
        canvasA[t].id == e && 'upperCase' == fstlObj[e] && (l = l.toUpperCase())
      }),
      push(),
      strokeWeight(0),
      textFont(n),
      translate(250, 250),
      rotate((i - 50) / 15.9)
    for (let e = 0; e < l.length; e++)
      this.hideFlag
        ? highlightLayerFlag || this.id == highlightLayerId
          ? (stroke(r, g, b), fill(r, g, b))
          : (stroke(217, 217, 217), fill(217, 217, 217))
        : (noFill(), noStroke()),
        Object.keys(fwlObj).forEach(e => {
          canvasA[t].id == e && 'whiten' == fwlObj[e] && fill(255, 255, 255)
        }),
        push(),
        textSize(+Number(o)),
        Object.keys(fsblObj).forEach(e => {
          canvasA[t].id == e && textStyle(fsblObj[e])
        }),
        Object.keys(fsilObj).forEach(e => {
          canvasA[t].id == e &&
            ('invert' == fsilObj[e]
              ? (push(),
                rotate(radians(180)),
                text(l, ((a - 50) / 1) * 3.3, ((d - 48) / 1) * 4.2),
                pop())
              : (push(),
                text(l, ((a - 50) / 1) * 3.3, ((d - 48) / 1) * 4.2),
                pop()))
        }),
        pop()
    pop()
  }
  renderBottomText(e, t) {
    let l,
      n = document.getElementById(this.id + 'bottomTextFontSize').value,
      o = document.getElementById(this.id + 'bottomTextRadius').value,
      a = document.getElementById(this.id + 'bottomTextFontSelect').value,
      d = document.getElementById('objectNo' + e + 'bottomText').value
    0 == d.length
      ? ((l = document.getElementById(
          'objectNo' + e + 'bottomText'
        ).placeholder),
        showEnterText())
      : ((l = document.getElementById('objectNo' + e + 'bottomText').value),
        showPricingAfterEnterText())
    let i,
      c = document.getElementById('objectNo' + e + 'bottomText1').value
    0 == c.length
      ? ((i = document.getElementById(
          'objectNo' + e + 'bottomText1'
        ).placeholder),
        showEnterText())
      : ((i = document.getElementById('objectNo' + e + 'bottomText1').value),
        showPricingAfterEnterText())
    let s,
      m = document.getElementById('objectNo' + e + 'bottomText2').value
    0 == m.length
      ? ((s = document.getElementById(
          'objectNo' + e + 'bottomText2'
        ).placeholder),
        showEnterText())
      : ((s = document.getElementById('objectNo' + e + 'bottomText2').value),
        showPricingAfterEnterText())
    let u,
      y = document.getElementById('objectNo' + e + 'bottomText3').value
    0 == y.length
      ? ((u = document.getElementById(
          'objectNo' + e + 'bottomText3'
        ).placeholder),
        showEnterText())
      : ((u = document.getElementById('objectNo' + e + 'bottomText3').value),
        showPricingAfterEnterText()),
      d.length > 0 &&
        c.length > 0 &&
        m.length > 0 &&
        y.length > 0 &&
        (showPricingAfterEnterText(),
        (document.getElementById('noText').style.display = 'none')),
      Object.keys(fstbObj).forEach(e => {
        canvasA[t].id == e &&
          'upperCase' == fstbObj[e] &&
          ((l = l.toUpperCase()),
          (i = i.toUpperCase()),
          (s = s.toUpperCase()),
          (u = u.toUpperCase()))
      }),
      push(),
      strokeWeight(0),
      textFont(a),
      translate(250, 250)
    for (let e = 0; e < l.length; e++)
      this.hideFlag
        ? highlightLayerFlag || this.id == highlightLayerId
          ? (stroke(r, g, b), fill(r, g, b))
          : (stroke(217, 217, 217), fill(217, 217, 217))
        : (noFill(), noStroke()),
        Object.keys(fswbObj).forEach(e => {
          canvasA[t].id == e && 'whiten' == fswbObj[e] && fill(255, 255, 255)
        }),
        textSize(+Number(n)),
        Object.keys(fsbbObj).forEach(e => {
          canvasA[t].id == e && textStyle(fsbbObj[e])
        }),
        Object.keys(fsibObj).forEach(e => {
          canvasA[t].id == e &&
            ('invert' == fsibObj[e]
              ? (push(),
                rotate(radians(180)),
                text(l, 0, 2.2 * o + 10),
                pop(),
                push(),
                rotate(radians(90)),
                text(i, 0, 2.2 * o + 10),
                pop(),
                push(),
                rotate(radians(360)),
                text(s, 0, 2.2 * o + 10),
                pop(),
                push(),
                rotate(radians(270)),
                text(u, 0, 2.2 * o + 10),
                pop())
              : (push(),
                rotate(radians(360)),
                text(l, 0, 2.2 * -o),
                pop(),
                push(),
                rotate(radians(90)),
                text(i, 0, 2.2 * -o),
                pop(),
                push(),
                rotate(radians(180)),
                text(s, 0, 2.2 * -o),
                pop(),
                push(),
                rotate(radians(270)),
                text(u, 0, 2.2 * -o),
                pop()))
        })
    pop()
  }
  renderTopText(e, t) {
    let l,
      n = document.getElementById(this.id + 'topTextFontSize').value,
      o = document.getElementById(this.id + 'topTextRadius').value,
      a = document.getElementById(this.id + 'topTextFontSelect').value,
      d = document.getElementById('objectNo' + e + 'topText').value
    0 == d.length
      ? ((l = document.getElementById('objectNo' + e + 'topText').placeholder),
        showEnterText())
      : ((l = document.getElementById('objectNo' + e + 'topText').value),
        showPricingAfterEnterText())
    let i,
      c = document.getElementById('objectNo' + e + 'topText1').value
    0 == c.length
      ? ((i = document.getElementById('objectNo' + e + 'topText1').placeholder),
        showEnterText())
      : ((i = document.getElementById('objectNo' + e + 'topText1').value),
        showPricingAfterEnterText())
    let s,
      m = document.getElementById('objectNo' + e + 'topText2').value
    0 == m.length
      ? ((s = document.getElementById('objectNo' + e + 'topText2').placeholder),
        showEnterText())
      : ((s = document.getElementById('objectNo' + e + 'topText2').value),
        showPricingAfterEnterText()),
      d.length > 0 &&
        c.length > 0 &&
        m.length > 0 &&
        (showPricingAfterEnterText(),
        (document.getElementById('noText').style.display = 'none')),
      Object.keys(fsttObj).forEach(e => {
        canvasA[t].id == e &&
          'upperCase' == fsttObj[e] &&
          ((l = l.toUpperCase()), (i = i.toUpperCase()), (s = s.toUpperCase()))
      }),
      push(),
      strokeWeight(0),
      textFont(a),
      translate(250, 250)
    for (let e = 0; e < l.length; e++)
      this.hideFlag
        ? highlightLayerFlag || this.id == highlightLayerId
          ? (stroke(r, g, b), fill(r, g, b))
          : (stroke(217, 217, 217), fill(217, 217, 217))
        : (noFill(), noStroke()),
        Object.keys(fswtObj).forEach(e => {
          canvasA[t].id == e && 'whiten' == fswtObj[e] && fill(255, 255, 255)
        }),
        textSize(+Number(n)),
        Object.keys(fsbtObj).forEach(e => {
          canvasA[t].id == e && textStyle(fsbtObj[e])
        }),
        push(),
        Object.keys(fsitObj).forEach(e => {
          canvasA[t].id == e &&
            ('invert' == fsitObj[e]
              ? (push(),
                rotate(radians(240)),
                text(l, 0, 1.5 * o - 10),
                pop(),
                push(),
                rotate(radians(360)),
                text(i, 0, 1.5 * o - 3),
                pop(),
                push(),
                rotate(radians(120)),
                text(s, 0, 1.5 * o - 10),
                pop())
              : (push(),
                rotate(radians(60.5)),
                text(l, 0, 1.5 * -o + 20),
                pop(),
                push(),
                rotate(radians(180)),
                text(i, 0, 1.5 * -o + 18),
                pop(),
                push(),
                rotate(radians(299.5)),
                text(s, 0, 1.5 * -o + 20),
                pop()))
        }),
        pop()
    pop()
  }
  renderRectText(e, t) {
    let l,
      n = document.getElementById(this.id + 'rectTextFontSize').value,
      o = document.getElementById(this.id + 'rectTextRadius').value,
      a = document.getElementById(this.id + 'rectTextFontSelect').value,
      d = document.getElementById('objectNo' + e + 'rectText').value
    l =
      0 == d.length
        ? document.getElementById('objectNo' + e + 'rectText').placeholder
        : document.getElementById('objectNo' + e + 'rectText').value
    let i,
      c = document.getElementById('objectNo' + e + 'rectText1').value
    0 == c.length
      ? ((i = document.getElementById(
          'objectNo' + e + 'rectText1'
        ).placeholder),
        showEnterText())
      : ((i = document.getElementById('objectNo' + e + 'rectText1').value),
        showPricingAfterEnterText())
    let s,
      m = document.getElementById('objectNo' + e + 'rectText2').value
    0 == m.length
      ? ((s = document.getElementById(
          'objectNo' + e + 'rectText2'
        ).placeholder),
        showEnterText())
      : ((s = document.getElementById('objectNo' + e + 'rectText2').value),
        showPricingAfterEnterText())
    let u,
      y = document.getElementById('objectNo' + e + 'rectText3').value
    0 == y.length
      ? ((u = document.getElementById(
          'objectNo' + e + 'rectText3'
        ).placeholder),
        showEnterText())
      : ((u = document.getElementById('objectNo' + e + 'rectText3').value),
        showPricingAfterEnterText()),
      d.length > 0 &&
        c.length > 0 &&
        m.length > 0 &&
        y.length > 0 &&
        (showPricingAfterEnterText(),
        (document.getElementById('noText').style.display = 'none')),
      Object.keys(fstrObj).forEach(e => {
        canvasA[t].id == e &&
          'upperCase' == fstrObj[e] &&
          ((l = l.toUpperCase()),
          (i = i.toUpperCase()),
          (s = s.toUpperCase()),
          (u = u.toUpperCase()))
      }),
      push(),
      strokeWeight(0),
      textFont(a),
      translate(250, 250)
    for (let e = 0; e < l.length; e++)
      this.hideFlag
        ? highlightLayerFlag || this.id == highlightLayerId
          ? (stroke(r, g, b), fill(r, g, b))
          : (stroke(217, 217, 217), fill(217, 217, 217))
        : (noFill(), noStroke()),
        Object.keys(fswrObj).forEach(e => {
          canvasA[t].id == e && 'whiten' == fswrObj[e] && fill(255, 255, 255)
        }),
        textSize(+Number(n)),
        Object.keys(fsbrObj).forEach(e => {
          canvasA[t].id == e && textStyle(fsbrObj[e])
        }),
        Object.keys(fsirObj).forEach(e => {
          canvasA[t].id == e &&
            ('invert' == fsirObj[e]
              ? (push(),
                rotate(radians(180)),
                text(l, 0, 1.12 * o),
                pop(),
                push(),
                rotate(radians(90)),
                text(i, 0, 2.16 * o),
                pop(),
                push(),
                rotate(radians(360)),
                text(s, 0, 1.12 * o),
                pop(),
                push(),
                rotate(radians(270)),
                text(u, 0, 2.16 * o),
                pop())
              : (push(),
                rotate(radians(360)),
                text(l, 0, -o),
                pop(),
                push(),
                rotate(radians(90)),
                text(i, 0, 2 * -o),
                pop(),
                push(),
                rotate(radians(180)),
                text(s, 0, -o),
                pop(),
                push(),
                rotate(radians(270)),
                text(u, 0, 2 * -o),
                pop()))
        })
    pop()
  }
  renderOvalText(e, t) {
    let l =
        parseFloat(
          document.getElementById(this.id + 'ovalTextFontSize').value
        ) || 20,
      n =
        parseFloat(
          document.getElementById(this.id + 'ovalTextSpacing').value
        ) || 0,
      o =
        parseInt(document.getElementById(this.id + 'ovalTextRadius').value) ||
        0,
      a =
        parseFloat(
          document.getElementById(this.id + 'ovalTextRotation').value
        ) || 0,
      d = document.getElementById(this.id + 'ovalTextFontSelect').value,
      i = document.getElementById('objectNo' + e + 'ovalText').value,
      c = 0,
      s = []
    if (0 == i.length) return void showEnterText()
    document
      .querySelector('#dwnBtnFree')
      .addEventListener('click', function () {
        document.getElementById('noText').style.display = 'none'
      }),
      showPricingAfterEnterText()
    let m = 3.7 * o,
      u = 1.59 * o
    if (
      (textSize(l),
      textFont(d),
      containsHindi(i) || containsArabic(i) || containsUrdu(i))
    ) {
      let e = ''
      e =
        containsArabic(i) || containsUrdu(i)
          ? i.split(' ').reverse()
          : i.split(' ')
      for (let t = 0; t < e.length; t++) {
        let l = textWidth(e[t]) + n
        ' ' === e[t] && (l = 0.7 * n), s.push(l), (c += l)
      }
      let l = -c / 2 / (m / 1.9) + radians(3.6 * a)
      push(), translate(250, 250)
      let o = l
      for (let l = 0; l < e.length; l++) {
        let n = s[l],
          a = o + n / 2 / (m / 2),
          d = (m / 2.41) * cos(a),
          i = (u / 2.2) * sin(a)
        push(), translate(d, i)
        let c = atan2((u / 2) * cos(a), (-m / 2.2) * sin(a))
        rotate(c),
          this.hideFlag
            ? highlightLayerFlag || this.id == highlightLayerId
              ? fill(r, g, b)
              : fill(217, 217, 217)
            : noFill(),
          Object.keys(fwoObj).forEach(e => {
            canvasA[t].id == e && 'whiten' == fwoObj[e] && fill(255, 255, 255)
          })
        let y = NORMAL
        Object.keys(fsboObj).forEach(e => {
          canvasA[t].id == e &&
            ('bold' == fsboObj[e] && (y = BOLD),
            'italic' == fsboObj[e] && (y = ITALIC),
            'bold italic' == fsboObj[e] && (y = BOLDITALIC))
        }),
          textStyle(y),
          text(e[l], 0, 0),
          pop(),
          (o += n / (m / 2))
      }
      return void pop()
    }
    Object.keys(fstoObj).forEach(e => {
      canvasA[t].id == e && 'upperCase' == fstoObj[e] && (i = i.toUpperCase())
    }),
      i.trim().split(/\s+/).length > 1 && !i.endsWith(' ') && (i += ' ')
    for (let e = 0; e < i.length; e++) {
      let t = textWidth(i[e]) + n
      ' ' === i[e] && (t = 0.7 * n), s.push(t), (c += t)
    }
    let y = -c / 2 / (m / 1.9) + radians(3.6 * a)
    push(), translate(250, 250)
    let h = y
    for (let e = 0; e < i.length; e++) {
      let l = s[e],
        n = h + l / 2 / (m / 2),
        o = (m / 2.41) * cos(n),
        a = (u / 2.2) * sin(n)
      push(), translate(o, a)
      let d = atan2((u / 2) * cos(n), (-m / 2.2) * sin(n))
      rotate(d),
        this.hideFlag
          ? highlightLayerFlag || this.id == highlightLayerId
            ? fill(r, g, b)
            : fill(217, 217, 217)
          : noFill(),
        Object.keys(fwoObj).forEach(e => {
          canvasA[t].id == e && 'whiten' == fwoObj[e] && fill(255, 255, 255)
        })
      let c = NORMAL
      Object.keys(fsboObj).forEach(e => {
        canvasA[t].id == e &&
          ('bold' == fsboObj[e] && (c = BOLD),
          'italic' == fsboObj[e] && (c = ITALIC),
          'bold italic' == fsboObj[e] && (c = BOLDITALIC))
      }),
        textStyle(c),
        text(i[e], 0, 0),
        pop(),
        (h += l / (m / 2))
    }
    pop()
  }
  renderQuadText(e, t) {
    let l,
      n = document.getElementById(this.id + 'quadTextFontSize').value,
      o = document.getElementById(this.id + 'quadTextRadius').value,
      a = document.getElementById(this.id + 'quadTextFontSelect').value,
      d = document.getElementById('objectNo' + e + 'quadText').value
    0 == d.length
      ? ((l = document.getElementById('objectNo' + e + 'quadText').placeholder),
        showEnterText())
      : ((l = document.getElementById('objectNo' + e + 'quadText').value),
        showPricingAfterEnterText())
    let i,
      c = document.getElementById('objectNo' + e + 'quadText1').value
    0 == c.length
      ? ((i = document.getElementById(
          'objectNo' + e + 'quadText1'
        ).placeholder),
        showEnterText())
      : ((i = document.getElementById('objectNo' + e + 'quadText1').value),
        showPricingAfterEnterText())
    let s,
      m = document.getElementById('objectNo' + e + 'quadText2').value
    0 == m.length
      ? ((s = document.getElementById(
          'objectNo' + e + 'quadText2'
        ).placeholder),
        showEnterText())
      : ((s = document.getElementById('objectNo' + e + 'quadText2').value),
        showPricingAfterEnterText())
    let u,
      y = document.getElementById('objectNo' + e + 'quadText3').value
    0 == y.length
      ? ((u = document.getElementById(
          'objectNo' + e + 'quadText3'
        ).placeholder),
        showEnterText())
      : ((u = document.getElementById('objectNo' + e + 'quadText3').value),
        showPricingAfterEnterText()),
      d.length > 0 &&
        c.length > 0 &&
        m.length > 0 &&
        y.length > 0 &&
        (showPricingAfterEnterText(),
        (document.getElementById('noText').style.display = 'none')),
      Object.keys(fstqObj).forEach(e => {
        canvasA[t].id == e &&
          'upperCase' == fstqObj[e] &&
          ((l = l.toUpperCase()),
          (i = i.toUpperCase()),
          (s = s.toUpperCase()),
          (u = u.toUpperCase()))
      }),
      push(),
      strokeWeight(0),
      textFont(a),
      translate(250, 250)
    for (let e = 0; e < l.length; e++)
      this.hideFlag
        ? highlightLayerFlag || this.id == highlightLayerId
          ? (stroke(r, g, b), fill(r, g, b))
          : (stroke(217, 217, 217), fill(217, 217, 217))
        : (noFill(), noStroke()),
        Object.keys(fwqObj).forEach(e => {
          canvasA[t].id == e && 'whiten' == fwqObj[e] && fill(255, 255, 255)
        }),
        textSize(+Number(n)),
        Object.keys(fsbqObj).forEach(e => {
          canvasA[t].id == e && textStyle(fsbqObj[e])
        }),
        Object.keys(fsiqObj).forEach(e => {
          canvasA[t].id == e &&
            ('invert' == fsiqObj[e]
              ? (push(),
                rotate(radians(136)),
                text(l, 0, 2.2 * o + 10),
                pop(),
                push(),
                rotate(radians(45)),
                text(i, 0, 2.2 * o + 10),
                pop(),
                push(),
                rotate(radians(316)),
                text(s, 0, 2.2 * o + 10),
                pop(),
                push(),
                rotate(radians(226)),
                text(u, 0, 2.2 * o + 10),
                pop())
              : (push(),
                rotate(radians(-45)),
                text(l, 0, 2.2 * -o),
                pop(),
                push(),
                rotate(radians(45)),
                text(i, 0, 2.2 * -o),
                pop(),
                push(),
                rotate(radians(135)),
                text(s, 0, 2.2 * -o),
                pop(),
                push(),
                rotate(radians(225)),
                text(u, 0, 2.2 * -o),
                pop()))
        })
    pop()
  }
  renderPNG(e, t) {
    let l = document.getElementById(this.id + 'imageSize').value,
      n = document.getElementById(this.id + 'imageHP').value,
      o = document.getElementById(this.id + 'imageVP').value,
      a = document.getElementById(this.id + 'imageRotate').value
    push(),
      imageMode(CENTER),
      translate(250, 250),
      rotate(a / 15.92),
      this.hideFlag &&
        holdImgFlag.map(e => {
          let a = e.split('_')[0],
            d = e.split('_')[1]
          void 0 !== img[a] &&
            canvasA[t].id === d &&
            (image(
              img[a],
              ((n - 50) / 1) * 3.8,
              ((o - 50) / 1) * 3.8,
              3.8 * l,
              3.8 * l
            ),
            img[a].loadPixels(),
            3 != e.split('_').length &&
              (highlightLayerFlag || this.id == highlightLayerId
                ? changeImgColor(
                    img[a].pixels,
                    img[a].width,
                    img[a].height,
                    r,
                    g,
                    b
                  )
                : changeImgColor(
                    img[a].pixels,
                    img[a].width,
                    img[a].height,
                    '217',
                    '217',
                    '217'
                  )),
            img[a].updatePixels())
        }),
      pop()
  }
}
function toggleMenu(e) {
  for (const e of document.getElementById('edit-layers-box').children)
    e.classList.remove('selected'), e.classList.add('unselected')
  e.classList.remove('unselected'), e.classList.add('selected')
}
function toggleSubMenu(e, t) {
  for (const e of document.getElementById('edit-layers-box').children)
    e.classList.remove('selected')
  e.classList.remove('unselected'),
    document.getElementById(t).classList.add('selected')
}
function toggleDelLayer(e, t) {
  for (const e of document.getElementById('edit-layers-box').children)
    e.classList.remove('selected'), e.classList.add('unselected')
  e.classList.remove('unselected')
}
function layerCounter() {
  let e = 0
  for (; e < document.getElementsByClassName('edit-text-around-box').length; )
    document.getElementsByClassName('edit-text-around-box')[e], e++
}
function addRectLayer(e) {
  elementCount++
  let t = document.querySelector('#layerFormat'),
    l = t.cloneNode(!0)
  ;(l.id = e ? e.id : 'objectNo' + objectCount),
    (l.name = '_range'),
    (shapeClone = l.id),
    (layerCategory = l.name),
    (toManipulate = l.id),
    (objSelectFlag = !0),
    (layerSelectFlag = !0),
    objectCount++,
    (canvasA[elementCount] =
      null != e
        ? new element(l.id, 'rect', 'template', e)
        : new element(l.id, 'rect')),
    (layerA[layerCount] = new element(l.id, 'rect')),
    layerCount++,
    (document.getElementById('count-layer').textContent = layerCount),
    layerCounter(),
    (l.style.display = 'block'),
    (l.querySelector('#eye').id = ++eyeId),
    (l.querySelector('#imgLayer').src = 'images/layers/layer-rect.svg'),
    (l.querySelector('#imgLayer').style.padding = '6px 0px 0px 0px'),
    (l.querySelector('#shapeName').innerHTML =
      lang['RECTANGLE_FRAME_#'] + ++rFrameCount),
    t.after(l),
    l.addEventListener('click', function () {
      ;(document.getElementById('edit-text-around-box').style.display = 'none'),
        (document.getElementById('edit-text-center-box').style.display =
          'none'),
        (document.getElementById('edit-text-bottom-box').style.display =
          'none'),
        (document.getElementById('edit-text-top-box').style.display = 'none'),
        (document.getElementById('edit-text-rect-box').style.display = 'none'),
        (document.getElementById('edit-text-oval-box').style.display = 'none'),
        (document.getElementById('edit-image-box').style.display = 'none'),
        (document.getElementById('edit-text-quad-box').style.display = 'none')
    }),
    Array.from(document.querySelectorAll('.allLayers')).forEach(e => {
      toggleSubMenu(e, l.id), e.addEventListener('click', () => toggleMenu(e))
    })
}
function addCircleLayer(e) {
  elementCount++
  let t = document.querySelector('#layerFormat'),
    l = t.cloneNode(!0)
  ;(l.id = e ? e.id : 'objectNo' + objectCount),
    (l.name = '_range'),
    (shapeClone = l.id),
    (layerCategory = l.name),
    (toManipulate = l.id),
    (objSelectFlag = !0),
    (layerSelectFlag = !0),
    objectCount++,
    (canvasA[elementCount] =
      null != e
        ? new element(l.id, 'circle', 'template', e)
        : new element(l.id, 'circle')),
    (layerA[layerCount] = new element(l.id, 'circle')),
    layerCount++,
    (document.getElementById('count-layer').textContent = layerCount),
    layerCounter(),
    (l.style.display = 'block'),
    (l.querySelector('#eye').id = ++eyeId),
    (l.querySelector('#imgLayer').src = 'images/layers/layer-circle.svg'),
    (l.querySelector('#imgLayer').style.padding = '3px 0px 0px 0px'),
    (l.querySelector('#shapeName').innerHTML =
      lang['CIRCLE_FRAME_#'] + ++cFrameCount),
    t.after(l),
    l.addEventListener('click', function () {
      ;(document.getElementById('edit-text-around-box').style.display = 'none'),
        (document.getElementById('edit-text-center-box').style.display =
          'none'),
        (document.getElementById('edit-text-bottom-box').style.display =
          'none'),
        (document.getElementById('edit-text-top-box').style.display = 'none'),
        (document.getElementById('edit-text-rect-box').style.display = 'none'),
        (document.getElementById('edit-text-oval-box').style.display = 'none'),
        (document.getElementById('edit-image-box').style.display = 'none'),
        (document.getElementById('edit-text-quad-box').style.display = 'none')
    }),
    Array.from(document.querySelectorAll('.allLayers')).forEach(e => {
      toggleSubMenu(e, l.id), e.addEventListener('click', () => toggleMenu(e))
    })
}
function addSquareLayer(e) {
  elementCount++
  let t = document.querySelector('#layerFormat'),
    l = t.cloneNode(!0)
  ;(l.id = e ? e.id : 'objectNo' + objectCount),
    (l.name = '_range'),
    (shapeClone = l.id),
    (layerCategory = l.name),
    (toManipulate = l.id),
    (objSelectFlag = !0),
    (layerSelectFlag = !0),
    objectCount++,
    (canvasA[elementCount] =
      null != e
        ? new element(l.id, 'square', 'template', e)
        : new element(l.id, 'square')),
    (layerA[layerCount] = new element(l.id, 'square')),
    layerCount++,
    (document.getElementById('count-layer').textContent = layerCount),
    layerCounter(),
    (l.style.display = 'block'),
    (l.querySelector('#eye').id = ++eyeId),
    (l.querySelector('#imgLayer').src = 'images/layers/layer-square.svg'),
    (l.querySelector('#shapeName').style.padding = '0px 0px 2px 3px'),
    (l.querySelector('#imgLayer').style.padding = '5px 0px 0px 0px'),
    (l.querySelector('#shapeName').innerHTML =
      lang['SQUARE_FRAME_#'] + ++sFrameCount),
    t.after(l),
    l.addEventListener('click', function () {
      ;(document.getElementById('edit-text-around-box').style.display = 'none'),
        (document.getElementById('edit-text-center-box').style.display =
          'none'),
        (document.getElementById('edit-text-bottom-box').style.display =
          'none'),
        (document.getElementById('edit-text-top-box').style.display = 'none'),
        (document.getElementById('edit-text-rect-box').style.display = 'none'),
        (document.getElementById('edit-text-oval-box').style.display = 'none'),
        (document.getElementById('edit-image-box').style.display = 'none'),
        (document.getElementById('edit-text-quad-box').style.display = 'none')
    }),
    Array.from(document.querySelectorAll('.allLayers')).forEach(e => {
      toggleSubMenu(e, l.id), e.addEventListener('click', () => toggleMenu(e))
    })
}
function addTriangleLayer(e) {
  elementCount++
  let t = document.querySelector('#layerFormat'),
    l = t.cloneNode(!0)
  ;(l.id = e ? e.id : 'objectNo' + objectCount),
    (l.name = '_range'),
    (shapeClone = l.id),
    (layerCategory = l.name),
    (toManipulate = l.id),
    (objSelectFlag = !0),
    (layerSelectFlag = !0),
    objectCount++,
    (canvasA[elementCount] =
      null != e
        ? new element(l.id, 'triangle', 'template', e)
        : new element(l.id, 'triangle')),
    (layerA[layerCount] = new element(l.id, 'triangle')),
    layerCount++,
    (document.getElementById('count-layer').textContent = layerCount),
    layerCounter(),
    (l.style.display = 'block'),
    (l.querySelector('#eye').id = ++eyeId),
    (l.querySelector('#imgLayer').src = 'images/layers/layer-triangle.svg'),
    (l.querySelector('#imgLayer').style.padding = '4px 0px 0px 0px'),
    (l.querySelector('#shapeName').innerHTML =
      lang['TRIANGLE_FRAME_#'] + ++tFrameCount),
    t.after(l),
    l.addEventListener('click', function () {
      ;(document.getElementById('edit-text-around-box').style.display = 'none'),
        (document.getElementById('edit-text-center-box').style.display =
          'none'),
        (document.getElementById('edit-text-bottom-box').style.display =
          'none'),
        (document.getElementById('edit-text-top-box').style.display = 'none'),
        (document.getElementById('edit-text-rect-box').style.display = 'none'),
        (document.getElementById('edit-text-oval-box').style.display = 'none'),
        (document.getElementById('edit-image-box').style.display = 'none'),
        (document.getElementById('edit-text-quad-box').style.display = 'none')
    }),
    Array.from(document.querySelectorAll('.allLayers')).forEach(e => {
      toggleSubMenu(e, l.id), e.addEventListener('click', () => toggleMenu(e))
    })
}
function addHexagramLayer(e) {
  elementCount++
  let t = document.querySelector('#layerFormat'),
    l = t.cloneNode(!0)
  ;(l.id = e ? e.id : 'objectNo' + objectCount),
    (l.name = '_range'),
    (shapeClone = l.id),
    (layerCategory = l.name),
    (toManipulate = l.id),
    (objSelectFlag = !0),
    (layerSelectFlag = !0),
    objectCount++,
    (canvasA[elementCount] =
      null != e
        ? new element(l.id, 'hexagram', 'template', e)
        : new element(l.id, 'hexagram')),
    (layerA[layerCount] = new element(l.id, 'hexagram')),
    layerCount++,
    (document.getElementById('count-layer').textContent = layerCount),
    layerCounter(),
    (layerA[layerCount] = new element(layerCount)),
    (l.style.display = 'block'),
    (l.querySelector('#eye').id = ++eyeId),
    (l.querySelector('#imgLayer').style.padding = '3px 0px 0px 0px'),
    (l.querySelector('#imgLayer').src = 'images/layers/layer-hexagram.svg'),
    (l.querySelector('#shapeName').innerHTML =
      lang['HEXAGRAM_FRAME_#'] + ++hexagramFrameCount),
    t.after(l),
    l.addEventListener('click', function () {
      ;(document.getElementById('edit-text-around-box').style.display = 'none'),
        (document.getElementById('edit-text-center-box').style.display =
          'none'),
        (document.getElementById('edit-text-bottom-box').style.display =
          'none'),
        (document.getElementById('edit-text-top-box').style.display = 'none'),
        (document.getElementById('edit-text-rect-box').style.display = 'none'),
        (document.getElementById('edit-text-oval-box').style.display = 'none'),
        (document.getElementById('edit-image-box').style.display = 'none'),
        (document.getElementById('edit-text-quad-box').style.display = 'none')
    }),
    Array.from(document.querySelectorAll('.allLayers')).forEach(e => {
      toggleSubMenu(e, l.id), e.addEventListener('click', () => toggleMenu(e))
    })
}
function addPentagonLayer(e) {
  elementCount++
  let t = document.querySelector('#layerFormat'),
    l = t.cloneNode(!0)
  ;(l.id = e ? e.id : 'objectNo' + objectCount),
    (l.name = '_range'),
    (shapeClone = l.id),
    (layerCategory = l.name),
    (toManipulate = l.id),
    (objSelectFlag = !0),
    (layerSelectFlag = !0),
    objectCount++,
    (canvasA[elementCount] =
      null != e
        ? new element(l.id, 'pentagon', 'template', e)
        : new element(l.id, 'pentagon')),
    (layerA[layerCount] = new element(l.id, 'pentagon')),
    layerCount++,
    (document.getElementById('count-layer').textContent = layerCount),
    layerCounter(),
    (layerA[layerCount] = new element(layerCount)),
    (l.style.display = 'block'),
    (l.querySelector('#eye').id = ++eyeId),
    (l.querySelector('#imgLayer').style.padding = '3px 0px 0px 0px'),
    (l.querySelector('#imgLayer').src = 'images/layers/layer-pentagon.svg'),
    (l.querySelector('#shapeName').innerHTML =
      lang['PENTAGON_FRAME_#'] + ++pFrameCount),
    t.after(l),
    l.addEventListener('click', function () {
      ;(document.getElementById('edit-text-around-box').style.display = 'none'),
        (document.getElementById('edit-text-center-box').style.display =
          'none'),
        (document.getElementById('edit-text-bottom-box').style.display =
          'none'),
        (document.getElementById('edit-text-top-box').style.display = 'none'),
        (document.getElementById('edit-text-rect-box').style.display = 'none'),
        (document.getElementById('edit-text-oval-box').style.display = 'none'),
        (document.getElementById('edit-image-box').style.display = 'none'),
        (document.getElementById('edit-text-quad-box').style.display = 'none')
    }),
    Array.from(document.querySelectorAll('.allLayers')).forEach(e => {
      toggleSubMenu(e, l.id), e.addEventListener('click', () => toggleMenu(e))
    })
}
function addNonagonLayer(e) {
  elementCount++
  let t = document.querySelector('#layerFormat'),
    l = t.cloneNode(!0)
  ;(l.id = e ? e.id : 'objectNo' + objectCount),
    (l.name = '_range'),
    (shapeClone = l.id),
    (layerCategory = l.name),
    (toManipulate = l.id),
    (objSelectFlag = !0),
    (layerSelectFlag = !0),
    objectCount++,
    (canvasA[elementCount] =
      null != e
        ? new element(l.id, 'nonagon', 'template', e)
        : new element(l.id, 'nonagon')),
    (layerA[layerCount] = new element(l.id, 'nonagon')),
    layerCount++,
    (document.getElementById('count-layer').textContent = layerCount),
    layerCounter(),
    (layerA[layerCount] = new element(layerCount)),
    (l.style.display = 'block'),
    (l.querySelector('#eye').id = ++eyeId),
    (l.querySelector('#imgLayer').src = 'images/layers/layer-nonagon.svg'),
    (l.querySelector('#imgLayer').style.padding = '2px 0px 0px 0px'),
    (l.querySelector('#shapeName').innerHTML =
      lang['NONAGON_FRAME_#'] + ++nonagonFrameCount),
    t.after(l),
    l.addEventListener('click', function () {
      ;(document.getElementById('edit-text-around-box').style.display = 'none'),
        (document.getElementById('edit-text-center-box').style.display =
          'none'),
        (document.getElementById('edit-text-bottom-box').style.display =
          'none'),
        (document.getElementById('edit-text-top-box').style.display = 'none'),
        (document.getElementById('edit-text-rect-box').style.display = 'none'),
        (document.getElementById('edit-text-oval-box').style.display = 'none'),
        (document.getElementById('edit-image-box').style.display = 'none'),
        (document.getElementById('edit-text-quad-box').style.display = 'none')
    }),
    Array.from(document.querySelectorAll('.allLayers')).forEach(e => {
      toggleSubMenu(e, l.id), e.addEventListener('click', () => toggleMenu(e))
    })
}
function addHexagonLayer(e) {
  elementCount++
  let t = document.querySelector('#layerFormat'),
    l = t.cloneNode(!0)
  ;(l.id = e ? e.id : 'objectNo' + objectCount),
    (l.name = '_range'),
    (shapeClone = l.id),
    (layerCategory = l.name),
    (toManipulate = l.id),
    (objSelectFlag = !0),
    (layerSelectFlag = !0),
    objectCount++,
    (canvasA[elementCount] =
      null != e
        ? new element(l.id, 'hexagon', 'template', e)
        : new element(l.id, 'hexagon')),
    (layerA[layerCount] = new element(l.id, 'hexagon')),
    layerCount++,
    (document.getElementById('count-layer').textContent = layerCount),
    layerCounter(),
    (layerA[layerCount] = new element(layerCount)),
    (l.style.display = 'block'),
    (l.querySelector('#eye').id = ++eyeId),
    (l.querySelector('#imgLayer').style.padding = '3px 0px 0px 0px'),
    (l.querySelector('#imgLayer').src = 'images/layers/layer-hexagon.svg'),
    (l.querySelector('#shapeName').innerHTML =
      lang['HEXAGON_FRAME_#'] + ++hFrameCount),
    t.after(l),
    l.addEventListener('click', function () {
      ;(document.getElementById('edit-text-around-box').style.display = 'none'),
        (document.getElementById('edit-text-center-box').style.display =
          'none'),
        (document.getElementById('edit-text-bottom-box').style.display =
          'none'),
        (document.getElementById('edit-text-top-box').style.display = 'none'),
        (document.getElementById('edit-text-rect-box').style.display = 'none'),
        (document.getElementById('edit-text-oval-box').style.display = 'none'),
        (document.getElementById('edit-image-box').style.display = 'none'),
        (document.getElementById('edit-text-quad-box').style.display = 'none')
    }),
    Array.from(document.querySelectorAll('.allLayers')).forEach(e => {
      toggleSubMenu(e, l.id), e.addEventListener('click', () => toggleMenu(e))
    })
}
function addStarLayer(e) {
  elementCount++
  let t = document.querySelector('#layerFormat'),
    l = t.cloneNode(!0)
  ;(l.id = e ? e.id : 'objectNo' + objectCount),
    (l.name = '_range'),
    (shapeClone = l.id),
    (layerCategory = l.name),
    (toManipulate = l.id),
    (objSelectFlag = !0),
    (layerSelectFlag = !0),
    objectCount++,
    (canvasA[elementCount] =
      null != e
        ? new element(l.id, 'star', 'template', e)
        : new element(l.id, 'star')),
    (layerA[layerCount] = new element(l.id, 'star')),
    layerCount++,
    (document.getElementById('count-layer').textContent = layerCount),
    layerCounter(),
    (layerA[layerCount] = new element(layerCount)),
    (l.style.display = 'block'),
    (l.querySelector('#eye').id = ++eyeId),
    (l.querySelector('#imgLayer').style.padding = '4px 0px 0px 0px'),
    (l.querySelector('#imgLayer').src = 'images/layers/layer-star.svg'),
    (l.querySelector('#shapeName').innerHTML =
      lang['Star_Frame_#'] + ++starFrameCount),
    t.after(l),
    l.addEventListener('click', function () {
      ;(document.getElementById('edit-text-around-box').style.display = 'none'),
        (document.getElementById('edit-text-center-box').style.display =
          'none'),
        (document.getElementById('edit-text-bottom-box').style.display =
          'none'),
        (document.getElementById('edit-text-top-box').style.display = 'none'),
        (document.getElementById('edit-text-rect-box').style.display = 'none'),
        (document.getElementById('edit-text-oval-box').style.display = 'none'),
        (document.getElementById('edit-image-box').style.display = 'none'),
        (document.getElementById('edit-text-quad-box').style.display = 'none')
    }),
    Array.from(document.querySelectorAll('.allLayers')).forEach(e => {
      toggleSubMenu(e, l.id), e.addEventListener('click', () => toggleMenu(e))
    })
}
function addOctagonLayer(e) {
  elementCount++
  let t = document.querySelector('#layerFormat'),
    l = t.cloneNode(!0)
  ;(l.id = e ? e.id : 'objectNo' + objectCount),
    (l.name = '_range'),
    (shapeClone = l.id),
    (layerCategory = l.name),
    (toManipulate = l.id),
    (objSelectFlag = !0),
    (layerSelectFlag = !0),
    objectCount++,
    (canvasA[elementCount] =
      null != e
        ? new element(l.id, 'octagon', 'template', e)
        : new element(l.id, 'octagon')),
    (layerA[layerCount] = new element(l.id, 'octagon')),
    layerCount++,
    (document.getElementById('count-layer').textContent = layerCount),
    layerCounter(),
    (layerA[layerCount] = new element(layerCount)),
    (l.style.display = 'block'),
    (l.querySelector('#eye').id = ++eyeId),
    (l.querySelector('#imgLayer').style.padding = '3px 0px 0px 0px'),
    (l.querySelector('#imgLayer').src = 'images/layers/layer-octagon.svg'),
    (l.querySelector('#shapeName').innerHTML =
      lang['OCTAGON_FRAME_#'] + ++octagonFrameCount),
    t.after(l),
    l.addEventListener('click', function () {
      ;(document.getElementById('edit-text-around-box').style.display = 'none'),
        (document.getElementById('edit-text-center-box').style.display =
          'none'),
        (document.getElementById('edit-text-bottom-box').style.display =
          'none'),
        (document.getElementById('edit-text-top-box').style.display = 'none'),
        (document.getElementById('edit-text-rect-box').style.display = 'none'),
        (document.getElementById('edit-text-oval-box').style.display = 'none'),
        (document.getElementById('edit-image-box').style.display = 'none'),
        (document.getElementById('edit-text-quad-box').style.display = 'none')
    }),
    Array.from(document.querySelectorAll('.allLayers')).forEach(e => {
      toggleSubMenu(e, l.id), e.addEventListener('click', () => toggleMenu(e))
    })
}
function addTwoSixLayer(e) {
  elementCount++
  let t = document.querySelector('#layerFormat'),
    l = t.cloneNode(!0)
  ;(l.id = e ? e.id : 'objectNo' + objectCount),
    (l.name = '_range'),
    (shapeClone = l.id),
    (layerCategory = l.name),
    (toManipulate = l.id),
    (objSelectFlag = !0),
    (layerSelectFlag = !0),
    objectCount++,
    (canvasA[elementCount] =
      null != e
        ? new element(l.id, 'twoSix', 'template', e)
        : new element(l.id, 'twoSix')),
    (layerA[layerCount] = new element(l.id, 'twoSix')),
    layerCount++,
    (document.getElementById('count-layer').textContent = layerCount),
    layerCounter(),
    (layerA[layerCount] = new element(layerCount)),
    (l.style.display = 'block'),
    (l.querySelector('#eye').id = ++eyeId),
    (l.querySelector('#imgLayer').style.padding = '4px 0px 0px 0px'),
    (l.querySelector('#imgLayer').src = 'images/layers/layer-24side.svg'),
    (l.querySelector('#shapeName').innerHTML =
      lang['SUPERSTAR_FRAME_#'] + ++twoSixFrameCount),
    t.after(l),
    l.addEventListener('click', function () {
      ;(document.getElementById('edit-text-around-box').style.display = 'none'),
        (document.getElementById('edit-text-center-box').style.display =
          'none'),
        (document.getElementById('edit-text-bottom-box').style.display =
          'none'),
        (document.getElementById('edit-text-top-box').style.display = 'none'),
        (document.getElementById('edit-text-rect-box').style.display = 'none'),
        (document.getElementById('edit-text-oval-box').style.display = 'none'),
        (document.getElementById('edit-image-box').style.display = 'none'),
        (document.getElementById('edit-text-quad-box').style.display = 'none')
    }),
    Array.from(document.querySelectorAll('.allLayers')).forEach(e => {
      toggleSubMenu(e, l.id), e.addEventListener('click', () => toggleMenu(e))
    })
}
function addQuadLayer(e) {
  elementCount++
  let t = document.querySelector('#layerFormat'),
    l = t.cloneNode(!0)
  ;(l.id = e ? e.id : 'objectNo' + objectCount),
    (l.name = '_range'),
    (shapeClone = l.id),
    (layerCategory = l.name),
    (toManipulate = l.id),
    (objSelectFlag = !0),
    (layerSelectFlag = !0),
    objectCount++,
    (canvasA[elementCount] =
      null != e
        ? new element(l.id, 'quad', 'template', e)
        : new element(l.id, 'quad')),
    (layerA[layerCount] = new element(l.id, 'quad')),
    layerCount++,
    (document.getElementById('count-layer').textContent = layerCount),
    layerCounter(),
    (layerA[layerCount] = new element(layerCount)),
    (l.style.display = 'block'),
    (l.querySelector('#eye').id = ++eyeId),
    (l.querySelector('#imgLayer').style.padding = '3px 0px 0px 0px'),
    (l.querySelector('#imgLayer').src = 'images/layers/layer-diamond.svg'),
    (l.querySelector('#shapeName').innerHTML =
      lang['RHOMBUS_FRAME_#'] + ++dFrameCount),
    t.after(l),
    l.addEventListener('click', function () {
      ;(document.getElementById('edit-text-around-box').style.display = 'none'),
        (document.getElementById('edit-text-center-box').style.display =
          'none'),
        (document.getElementById('edit-text-bottom-box').style.display =
          'none'),
        (document.getElementById('edit-text-top-box').style.display = 'none'),
        (document.getElementById('edit-text-rect-box').style.display = 'none'),
        (document.getElementById('edit-text-oval-box').style.display = 'none'),
        (document.getElementById('edit-image-box').style.display = 'none'),
        (document.getElementById('edit-text-quad-box').style.display = 'none')
    }),
    Array.from(document.querySelectorAll('.allLayers')).forEach(e => {
      toggleSubMenu(e, l.id), e.addEventListener('click', () => toggleMenu(e))
    })
}
function addOvalLayer(e) {
  elementCount++
  let t = document.querySelector('#layerFormat'),
    l = t.cloneNode(!0)
  ;(l.id = e ? e.id : 'objectNo' + objectCount),
    (l.name = '_range'),
    (shapeClone = l.id),
    (layerCategory = l.name),
    (toManipulate = l.id),
    (objSelectFlag = !0),
    (layerSelectFlag = !0),
    objectCount++,
    (canvasA[elementCount] =
      null != e
        ? new element(l.id, 'oval', 'template', e)
        : new element(l.id, 'oval')),
    (layerA[layerCount] = new element(l.id, 'oval')),
    layerCount++,
    (document.getElementById('count-layer').textContent = layerCount),
    layerCounter(),
    (layerA[layerCount] = new element(layerCount)),
    (l.style.display = 'block'),
    (l.querySelector('#eye').id = ++eyeId),
    (l.querySelector('#imgLayer').style.padding = '6px 0px 0px 0px'),
    (l.querySelector('#imgLayer').src = 'images/layers/layer-oval.svg'),
    (l.querySelector('#shapeName').innerHTML =
      lang['OVAL_FRAME_#'] + ++ovalFrameCount),
    t.after(l),
    l.addEventListener('click', function () {
      ;(document.getElementById('edit-text-around-box').style.display = 'none'),
        (document.getElementById('edit-text-center-box').style.display =
          'none'),
        (document.getElementById('edit-text-bottom-box').style.display =
          'none'),
        (document.getElementById('edit-text-top-box').style.display = 'none'),
        (document.getElementById('edit-text-rect-box').style.display = 'none'),
        (document.getElementById('edit-text-oval-box').style.display = 'none'),
        (document.getElementById('edit-image-box').style.display = 'none'),
        (document.getElementById('edit-text-quad-box').style.display = 'none')
    }),
    Array.from(document.querySelectorAll('.allLayers')).forEach(e => {
      toggleSubMenu(e, l.id), e.addEventListener('click', () => toggleMenu(e))
    })
}
function addCubeLayer(e) {
  elementCount++
  let t = document.querySelector('#layerFormat'),
    l = t.cloneNode(!0)
  ;(l.id = e ? e.id : 'objectNo' + objectCount),
    (l.name = '_range'),
    (shapeClone = l.id),
    (layerCategory = l.name),
    (toManipulate = l.id),
    (objSelectFlag = !0),
    (layerSelectFlag = !0),
    objectCount++,
    (canvasA[elementCount] =
      null != e
        ? new element(l.id, 'cube', 'template', e)
        : new element(l.id, 'cube')),
    (layerA[layerCount] = new element(l.id, 'cube')),
    layerCount++,
    (document.getElementById('count-layer').textContent = layerCount),
    layerCounter(),
    (layerA[layerCount] = new element(layerCount)),
    (l.style.display = 'block'),
    (l.querySelector('#eye').id = ++eyeId),
    (l.querySelector('#imgLayer').style.padding = '3px 0px 0px 0px'),
    (l.querySelector('#imgLayer').src = 'images/layers/layer-cube.svg'),
    (l.querySelector('#shapeName').innerHTML =
      lang['CUBE_FRAME_#'] + ++cubeFrameCount),
    t.after(l),
    l.addEventListener('click', function () {
      ;(document.getElementById('edit-text-around-box').style.display = 'none'),
        (document.getElementById('edit-text-center-box').style.display =
          'none'),
        (document.getElementById('edit-text-bottom-box').style.display =
          'none'),
        (document.getElementById('edit-text-top-box').style.display = 'none'),
        (document.getElementById('edit-text-rect-box').style.display = 'none'),
        (document.getElementById('edit-text-oval-box').style.display = 'none'),
        (document.getElementById('edit-image-box').style.display = 'none'),
        (document.getElementById('edit-text-quad-box').style.display = 'none')
    }),
    Array.from(document.querySelectorAll('.allLayers')).forEach(e => {
      toggleSubMenu(e, l.id), e.addEventListener('click', () => toggleMenu(e))
    })
}
function addLineLayer(e) {
  elementCount++
  let t = document.querySelector('#layerFormat'),
    l = t.cloneNode(!0)
  ;(l.id = e ? e.id : 'objectNo' + objectCount),
    (l.name = '_range'),
    (shapeClone = l.id),
    (layerCategory = l.name),
    (toManipulate = l.id),
    (objSelectFlag = !0),
    (layerSelectFlag = !0),
    objectCount++,
    (canvasA[elementCount] =
      null != e
        ? new element(l.id, 'line', 'template', e)
        : new element(l.id, 'line')),
    (layerA[layerCount] = new element(l.id, 'line')),
    layerCount++,
    (document.getElementById('count-layer').textContent = layerCount),
    layerCounter(),
    (layerA[layerCount] = new element(layerCount)),
    (l.style.display = 'block'),
    (l.querySelector('#eye').id = ++eyeId),
    (l.querySelector('#imgLayer').style.padding = '10px 0px 0px 0px'),
    (l.querySelector('#imgLayer').src = 'images/layers/layer-line.svg'),
    (l.querySelector('#shapeName').innerHTML =
      lang['LINE_FRAME_#'] + ++ovalFrameCount),
    t.after(l),
    l.addEventListener('click', function () {
      ;(document.getElementById('edit-text-around-box').style.display = 'none'),
        (document.getElementById('edit-text-center-box').style.display =
          'none'),
        (document.getElementById('edit-text-bottom-box').style.display =
          'none'),
        (document.getElementById('edit-text-top-box').style.display = 'none'),
        (document.getElementById('edit-text-rect-box').style.display = 'none'),
        (document.getElementById('edit-text-oval-box').style.display = 'none'),
        (document.getElementById('edit-image-box').style.display = 'none'),
        (document.getElementById('edit-text-quad-box').style.display = 'none')
    }),
    Array.from(document.querySelectorAll('.allLayers')).forEach(e => {
      toggleSubMenu(e, l.id), e.addEventListener('click', () => toggleMenu(e))
    })
}
function addCircularTextLayer(e, t = 'normal') {
  elementCount++
  let l = document.querySelector('#layerFormat'),
    n = l.cloneNode(!0)
  ;(n.id = e ? e.id : 'objectNo' + objectCount),
    (n.name = '_editCircularText'),
    (shapeClone = n.id),
    (layerCategory = n.name),
    (toManipulate = n.id),
    (objSelectFlag = !0),
    (layerSelectFlag = !0),
    objectCount++,
    null != e
      ? ((canvasA[elementCount] = new element(
          n.id,
          'circularText',
          'template',
          e
        )),
        (n.querySelector('#shapeName').innerHTML = e.textInput))
      : ((canvasA[elementCount] = new element(n.id, 'circularText')),
        (fsiObj[n.id] = t),
        (n.querySelector('#shapeName').innerHTML =
          lang.STAMPJAM_CIRCULAR_TEXT)),
    (layerA[layerCount] = new element(n.id, 'circularText')),
    layerCount++,
    (document.getElementById('count-layer').textContent = layerCount),
    (n.style.display = 'block'),
    (n.querySelector('#eye').id = ++eyeId),
    (n.querySelector('#imgLayer').style.padding = '3px 0px 0px 0px'),
    (n.querySelector('#imgLayer').src = 'images/layers/layer-circular-text.svg')
  let o = 'layer' + ++shapeId
  ;(n.querySelector('#shapeName').id = o),
    l.after(n),
    n.addEventListener('click', function () {
      ;(document.getElementById('edit-shape-box').style.display = 'none'),
        (document.getElementById('edit-text-center-box').style.display =
          'none'),
        (document.getElementById('edit-text-bottom-box').style.display =
          'none'),
        (document.getElementById('edit-text-top-box').style.display = 'none'),
        (document.getElementById('edit-image-box').style.display = 'none'),
        (document.getElementById('edit-text-rect-box').style.display = 'none'),
        (document.getElementById('edit-text-oval-box').style.display = 'none'),
        (document.getElementById('edit-text-quad-box').style.display = 'none')
    }),
    Array.from(document.querySelectorAll('.allLayers')).forEach(e => {
      toggleSubMenu(e, n.id), e.addEventListener('click', () => toggleMenu(e))
    }),
    (circularTextLayerId =
      document.getElementById(shapeClone).children[0].children[1].children[1]
        .children[0].id)
}
function addCenterTextLayer(e) {
  elementCount++
  let t = document.querySelector('#layerFormat'),
    l = t.cloneNode(!0)
  ;(l.id = e ? e.id : 'objectNo' + objectCount),
    (l.name = '_editCenterText'),
    (shapeClone = l.id),
    (layerCategory = l.name),
    (toManipulate = l.id),
    (objSelectFlag = !0),
    (layerSelectFlag = !0),
    objectCount++,
    null != e
      ? ((canvasA[elementCount] = new element(
          l.id,
          'centerText',
          'template',
          e
        )),
        (l.querySelector('#shapeName').innerHTML = e.textInput))
      : ((canvasA[elementCount] = new element(l.id, 'centerText')),
        (fsilObj[l.id] = 'normal'),
        (l.querySelector('#shapeName').innerHTML = lang.STAMPJAM_LINE_TEXT)),
    (layerA[layerCount] = new element(l.id, 'centerText')),
    layerCount++,
    (document.getElementById('count-layer').textContent = layerCount),
    (l.style.display = 'block'),
    (l.querySelector('#eye').id = ++eyeId),
    (l.querySelector('#imgLayer').src = 'images/layers/layer-center-text.svg'),
    (l.querySelector('#imgLayer').style.padding = '10px 0px 0px 0px')
  let n = 'layer' + ++shapeId
  ;(l.querySelector('#shapeName').id = n),
    t.after(l),
    l.addEventListener('click', function () {
      ;(document.getElementById('edit-shape-box').style.display = 'none'),
        (document.getElementById('edit-text-around-box').style.display =
          'none'),
        (document.getElementById('edit-text-bottom-box').style.display =
          'none'),
        (document.getElementById('edit-text-top-box').style.display = 'none'),
        (document.getElementById('edit-image-box').style.display = 'none'),
        (document.getElementById('edit-text-rect-box').style.display = 'none'),
        (document.getElementById('edit-text-oval-box').style.display = 'none'),
        (document.getElementById('edit-text-quad-box').style.display = 'none')
    }),
    Array.from(document.querySelectorAll('.allLayers')).forEach(e => {
      toggleSubMenu(e, l.id), e.addEventListener('click', () => toggleMenu(e))
    }),
    (centerTextLayerId =
      document.getElementById(shapeClone).children[0].children[1].children[1]
        .children[0].id)
}
function addBottomTextLayer(e) {
  elementCount++
  let t = document.querySelector('#layerFormat'),
    l = t.cloneNode(!0)
  ;(l.id = e ? e.id : 'objectNo' + objectCount),
    (l.name = '_editBottomText'),
    (shapeClone = l.id),
    (layerCategory = l.name),
    (toManipulate = l.id),
    (objSelectFlag = !0),
    (layerSelectFlag = !0),
    objectCount++,
    null != e
      ? ((canvasA[elementCount] = new element(
          l.id,
          'bottomText',
          'template',
          e
        )),
        (l.querySelector('#shapeName').innerHTML = e.textInput))
      : ((canvasA[elementCount] = new element(l.id, 'bottomText')),
        (fsibObj[l.id] = 'normal'),
        (l.querySelector('#shapeName').innerHTML = lang.STAMPJAM_SQUARE_TEXT)),
    (layerA[layerCount] = new element(l.id, 'bottomText')),
    layerCount++,
    (document.getElementById('count-layer').textContent = layerCount),
    (l.style.display = 'block'),
    (l.querySelector('#eye').id = ++eyeId),
    (l.querySelector('#imgLayer').src = 'images/layers/layer-bottom-text.svg'),
    (l.querySelector('#imgLayer').style.padding = '3px 0px 0px 0px')
  let n = 'layer' + ++shapeId
  ;(l.querySelector('#shapeName').id = n),
    t.after(l),
    l.addEventListener('click', function () {
      ;(document.getElementById('edit-shape-box').style.display = 'none'),
        (document.getElementById('edit-text-around-box').style.display =
          'none'),
        (document.getElementById('edit-text-center-box').style.display =
          'none'),
        (document.getElementById('edit-text-top-box').style.display = 'none'),
        (document.getElementById('edit-image-box').style.display = 'none'),
        (document.getElementById('edit-text-rect-box').style.display = 'none'),
        (document.getElementById('edit-text-oval-box').style.display = 'none'),
        (document.getElementById('edit-text-quad-box').style.display = 'none')
    }),
    Array.from(document.querySelectorAll('.allLayers')).forEach(e => {
      toggleSubMenu(e, l.id), e.addEventListener('click', () => toggleMenu(e))
    }),
    (bottomTextLayerId =
      document.getElementById(shapeClone).children[0].children[1].children[1]
        .children[0].id)
}
function addTopTextLayer(e) {
  elementCount++
  let t = document.querySelector('#layerFormat'),
    l = t.cloneNode(!0)
  ;(l.id = e ? e.id : 'objectNo' + objectCount),
    (l.name = '_editTopText'),
    (shapeClone = l.id),
    (layerCategory = l.name),
    (toManipulate = l.id),
    (objSelectFlag = !0),
    (layerSelectFlag = !0),
    objectCount++,
    null != e
      ? ((canvasA[elementCount] = new element(l.id, 'topText', 'template', e)),
        (l.querySelector('#shapeName').innerHTML = e.textInput))
      : ((canvasA[elementCount] = new element(l.id, 'topText')),
        (fsitObj[l.id] = 'normal'),
        (l.querySelector('#shapeName').innerHTML =
          lang.STAMPJAM_TRIANGULAR_TEXT)),
    (layerA[layerCount] = new element(l.id, 'topText')),
    layerCount++,
    (document.getElementById('count-layer').textContent = layerCount),
    (l.style.display = 'block'),
    (l.querySelector('#eye').id = ++eyeId),
    (l.querySelector('#imgLayer').src = 'images/layers/layer-top-text.svg'),
    (l.querySelector('#imgLayer').style.padding = '3px 0px 0px 0px')
  let n = 'layer' + ++shapeId
  ;(l.querySelector('#shapeName').id = n),
    t.after(l),
    l.addEventListener('click', function () {
      ;(document.getElementById('edit-shape-box').style.display = 'none'),
        (document.getElementById('edit-text-around-box').style.display =
          'none'),
        (document.getElementById('edit-text-center-box').style.display =
          'none'),
        (document.getElementById('edit-text-bottom-box').style.display =
          'none'),
        (document.getElementById('edit-image-box').style.display = 'none'),
        (document.getElementById('edit-text-rect-box').style.display = 'none'),
        (document.getElementById('edit-text-oval-box').style.display = 'none'),
        (document.getElementById('edit-text-quad-box').style.display = 'none')
    }),
    Array.from(document.querySelectorAll('.allLayers')).forEach(e => {
      toggleSubMenu(e, l.id), e.addEventListener('click', () => toggleMenu(e))
    }),
    (topTextLayerId =
      document.getElementById(shapeClone).children[0].children[1].children[1]
        .children[0].id)
}
function addRectTextLayer(e) {
  elementCount++
  let t = document.querySelector('#layerFormat'),
    l = t.cloneNode(!0)
  ;(l.id = e ? e.id : 'objectNo' + objectCount),
    (l.name = '_editRectText'),
    (shapeClone = l.id),
    (layerCategory = l.name),
    (toManipulate = l.id),
    (objSelectFlag = !0),
    (layerSelectFlag = !0),
    objectCount++,
    null != e
      ? ((canvasA[elementCount] = new element(l.id, 'rectText', 'template', e)),
        (l.querySelector('#shapeName').innerHTML = e.textInput))
      : ((canvasA[elementCount] = new element(l.id, 'rectText')),
        (fsirObj[l.id] = 'normal'),
        (l.querySelector('#shapeName').innerHTML =
          lang.STAMPJAM_RECTANGULAR_TEXT)),
    (layerA[layerCount] = new element(l.id, 'rectText')),
    layerCount++,
    (document.getElementById('count-layer').textContent = layerCount),
    (l.style.display = 'block'),
    (l.querySelector('#eye').id = ++eyeId),
    (l.querySelector('#imgLayer').src = 'images/layers/layer-rect-text.svg'),
    (l.querySelector('#imgLayer').style.padding = '6px 0px 0px 0px')
  let n = 'layer' + ++shapeId
  ;(l.querySelector('#shapeName').id = n),
    t.after(l),
    l.addEventListener('click', function () {
      ;(document.getElementById('edit-shape-box').style.display = 'none'),
        (document.getElementById('edit-text-around-box').style.display =
          'none'),
        (document.getElementById('edit-text-center-box').style.display =
          'none'),
        (document.getElementById('edit-text-bottom-box').style.display =
          'none'),
        (document.getElementById('edit-text-top-box').style.display = 'none'),
        (document.getElementById('edit-image-box').style.display = 'none'),
        (document.getElementById('edit-text-oval-box').style.display = 'none'),
        (document.getElementById('edit-text-quad-box').style.display = 'none')
    }),
    Array.from(document.querySelectorAll('.allLayers')).forEach(e => {
      toggleSubMenu(e, l.id), e.addEventListener('click', () => toggleMenu(e))
    }),
    (rectTextLayerId =
      document.getElementById(shapeClone).children[0].children[1].children[1]
        .children[0].id)
}
function addOvalTextLayer(e) {
  elementCount++
  let t = document.querySelector('#layerFormat'),
    l = t.cloneNode(!0)
  ;(l.id = e ? e.id : 'objectNo' + objectCount),
    (l.name = '_editOvalText'),
    (shapeClone = l.id),
    (layerCategory = l.name),
    (toManipulate = l.id),
    (objSelectFlag = !0),
    (layerSelectFlag = !0),
    objectCount++,
    null != e
      ? ((canvasA[elementCount] = new element(l.id, 'ovalText', 'template', e)),
        (l.querySelector('#shapeName').innerHTML = lang.STAMPJAM_OVAL_TEXT))
      : ((canvasA[elementCount] = new element(l.id, 'ovalText')),
        (fsioObj[l.id] = 'normal'),
        (l.querySelector('#shapeName').innerHTML = lang.STAMPJAM_OVAL_TEXT)),
    (layerA[layerCount] = new element(l.id, 'ovalText')),
    layerCount++,
    (document.getElementById('count-layer').textContent = layerCount),
    (l.style.display = 'block'),
    (l.querySelector('#eye').id = ++eyeId),
    (l.querySelector('#imgLayer').style.padding = '6px 0px 0px 0px'),
    (l.querySelector('#imgLayer').src = 'images/layers/layer-oval-text.svg')
  let n = 'layer' + ++shapeId
  ;(l.querySelector('#shapeName').id = n),
    t.after(l),
    l.addEventListener('click', function () {
      ;(document.getElementById('edit-shape-box').style.display = 'none'),
        (document.getElementById('edit-text-around-box').style.display =
          'none'),
        (document.getElementById('edit-text-center-box').style.display =
          'none'),
        (document.getElementById('edit-text-bottom-box').style.display =
          'none'),
        (document.getElementById('edit-text-top-box').style.display = 'none'),
        (document.getElementById('edit-image-box').style.display = 'none'),
        (document.getElementById('edit-text-rect-box').style.display = 'none'),
        (document.getElementById('edit-text-quad-box').style.display = 'none')
    }),
    Array.from(document.querySelectorAll('.allLayers')).forEach(e => {
      toggleSubMenu(e, l.id), e.addEventListener('click', () => toggleMenu(e))
    }),
    (ovalTextLayerId =
      document.getElementById(shapeClone).children[0].children[1].children[1]
        .children[0].id)
}
function addQuadTextLayer(e) {
  elementCount++
  let t = document.querySelector('#layerFormat'),
    l = t.cloneNode(!0)
  ;(l.id = e ? e.id : 'objectNo' + objectCount),
    (l.name = '_editQuadText'),
    (shapeClone = l.id),
    (layerCategory = l.name),
    (toManipulate = l.id),
    (objSelectFlag = !0),
    (layerSelectFlag = !0),
    objectCount++,
    null != e
      ? ((canvasA[elementCount] = new element(l.id, 'quadText', 'template', e)),
        (l.querySelector('#shapeName').innerHTML = lang.STAMPJAM_RHOMBUS_TEXT))
      : ((canvasA[elementCount] = new element(l.id, 'quadText')),
        (fsiqObj[l.id] = 'normal'),
        (l.querySelector('#shapeName').innerHTML = lang.STAMPJAM_RHOMBUS_TEXT)),
    (layerA[layerCount] = new element(l.id, 'quadText')),
    layerCount++,
    (document.getElementById('count-layer').textContent = layerCount),
    (l.style.display = 'block'),
    (l.querySelector('#eye').id = ++eyeId),
    (l.querySelector('#imgLayer').style.padding = '2px 0px 0px 0px'),
    (l.querySelector('#imgLayer').src = 'images/layers/layer-quad-text.svg')
  let n = 'layer' + ++shapeId
  ;(l.querySelector('#shapeName').id = n),
    t.after(l),
    l.addEventListener('click', function () {
      ;(document.getElementById('edit-shape-box').style.display = 'none'),
        (document.getElementById('edit-text-around-box').style.display =
          'none'),
        (document.getElementById('edit-text-center-box').style.display =
          'none'),
        (document.getElementById('edit-text-bottom-box').style.display =
          'none'),
        (document.getElementById('edit-text-top-box').style.display = 'none'),
        (document.getElementById('edit-image-box').style.display = 'none'),
        (document.getElementById('edit-text-rect-box').style.display = 'none'),
        (document.getElementById('edit-text-oval-box').style.display = 'none')
    }),
    Array.from(document.querySelectorAll('.allLayers')).forEach(e => {
      toggleSubMenu(e, l.id), e.addEventListener('click', () => toggleMenu(e))
    }),
    (quadTextLayerId =
      document.getElementById(shapeClone).children[0].children[1].children[1]
        .children[0].id)
}
function passImg2Layer(e, t, l, n, o) {
  elementCount++
  let a = e
  a = replaceVersion(a)
  let d = document.querySelector('#layerFormat'),
    i = d.cloneNode(!0)
  ;(i.id = n ? n.id : 'objectNo' + objectCount),
    (i.name = '_editImage'),
    (shapeClone = i.id),
    (layerCategory = i.name),
    (toManipulate = i.id),
    (objSelectFlag = !0),
    (layerSelectFlag = !0),
    objectCount++,
    (canvasA[elementCount] =
      null != n
        ? new element(i.id, 'image', 'template', n, a, o)
        : new element(i.id, 'image', null, null, a, o)),
    (layerA[layerCount] = new element(i.id, 'image')),
    layerCount++,
    (document.getElementById('count-layer').textContent = layerCount),
    (i.style.display = 'block'),
    (i.querySelector('#eye').id = ++eyeId),
    (i.querySelector('#imgLayer').src = a),
    (i.querySelector('#imgLayer').style.width = '25px'),
    (i.querySelector('#imgLayer').style.height = '24px'),
    (i.querySelector('#imgLayer').style.marginTop = '3px'),
    (i.querySelector('#shapeName').innerHTML = lang.IMAGE_ + ++imgFrameCount),
    d.after(i),
    i.addEventListener('click', function () {
      ;(document.getElementById('edit-shape-box').style.display = 'none'),
        (document.getElementById('edit-text-around-box').style.display =
          'none'),
        (document.getElementById('edit-text-center-box').style.display =
          'none'),
        (document.getElementById('edit-text-bottom-box').style.display =
          'none'),
        (document.getElementById('edit-text-top-box').style.display = 'none'),
        (document.getElementById('edit-text-rect-box').style.display = 'none'),
        (document.getElementById('edit-text-oval-box').style.display = 'none'),
        (document.getElementById('edit-text-quad-box').style.display = 'none')
    }),
    '_uploadedImg' == t && imgOnCanvas(l, t),
    Array.from(document.querySelectorAll('.allLayers')).forEach(e => {
      toggleSubMenu(e, i.id), e.addEventListener('click', () => toggleMenu(e))
    })
}
function addShape(e, t, l, n, o, a, d) {
  let i = document.getElementById('edit-shape-box').cloneNode(!0)
  ;(i.id = shapeClone + '_range'),
    (i.children[2].children[0].children[0].children[1].children[1].id =
      shapeClone + 'scale'),
    (i.children[2].children[0].children[1].children[1].children[1].id =
      shapeClone + 'stroke'),
    (i.children[2].children[0].children[2].children[1].children[1].id =
      shapeClone + 'lineBreak'),
    'line' == e &&
      ((i.children[2].children[0].children[3].style.display = 'block'),
      (i.children[2].children[0].children[4].children[1].children[1].id =
        shapeClone + 'hp'),
      (i.children[2].children[0].children[4].style.display = 'block'),
      (i.children[2].children[0].children[5].children[1].children[1].id =
        shapeClone + 'vp'),
      (i.children[2].children[0].children[5].style.display = 'block'),
      (i.children[2].children[0].children[6].children[1].children[1].id =
        shapeClone + 'rotation'),
      (i.children[2].children[0].children[6].style.display = 'block')),
    null != t &&
      '' != t &&
      null != t &&
      ((i.children[2].children[0].children[0].children[1].children[0].value =
        t),
      (i.children[2].children[0].children[0].children[1].children[1].value = t),
      (i.children[2].children[0].children[1].children[1].children[0].value = l),
      (i.children[2].children[0].children[1].children[1].children[1].value = l),
      (i.children[2].children[0].children[2].children[1].children[0].value = n),
      (i.children[2].children[0].children[2].children[1].children[1].value = n),
      (e = 'line') &&
        ((i.children[2].children[0].children[4].children[1].children[0].value =
          o),
        (i.children[2].children[0].children[4].children[1].children[1].value =
          o),
        (i.children[2].children[0].children[5].children[1].children[0].value =
          a),
        (i.children[2].children[0].children[5].children[1].children[1].value =
          a),
        (i.children[2].children[0].children[6].children[1].children[0].value =
          d),
        (i.children[2].children[0].children[6].children[1].children[1].value =
          d)))
  for (
    let e = 10;
    e < document.getElementById('editGroup').children.length;
    e++
  )
    document
      .getElementById('editGroup')
      .children[e].classList.add('hasNoControl')
  switch (
    ('_range' != layerCategory &&
      null != layerCategory &&
      null != hasNoControlLayerId &&
      null != document.getElementById(hasNoControlLayerId + layerCategory) &&
      (document.getElementById(
        hasNoControlLayerId + layerCategory
      ).style.display = 'none'),
    document.getElementById('editGroup').appendChild(i),
    (document.getElementById(i.id).style.display = 'block'),
    (document.getElementById('start-box').style.display = 'none'),
    (document.getElementById('dwnBtnFree').disabled = !1),
    (document.getElementById('edit-text-around-box').style.display = 'none'),
    (document.getElementById('edit-text-center-box').style.display = 'none'),
    (document.getElementById('edit-text-bottom-box').style.display = 'none'),
    (document.getElementById('edit-text-top-box').style.display = 'none'),
    (document.getElementById('edit-text-rect-box').style.display = 'none'),
    (document.getElementById('edit-image-box').style.display = 'none'),
    (document.getElementById('edit-layers-box').style.display = 'block'),
    (document.getElementById('fill_span').style.color = '#009EF8'),
    (document.getElementById('fadeSpan').style.color = '#009EF8'),
    (document.getElementById('docViewText').style.color = '#009EF8'),
    (document.getElementById('docView').style.pointerEvents = 'auto'),
    (document.getElementById('docView').style.cursor = 'pointer'),
    (document.getElementById('fill-icon').style.filter = 'none'),
    (document.getElementById('resetText').style.color = '#009EF8'),
    (document.getElementById('resetIcon').style.filter = ''),
    (document.getElementById('resetIcon').style.opacity = ''),
    (document.getElementById('deleteText').style.color = '#009EF8'),
    (document.getElementById('deleteIcon').style.filter = ''),
    (document.getElementById('deleteIcon').style.opacity = ''),
    (document.getElementById('delete').style.cursor = 'pointer'),
    (document.getElementById('resetField').style.pointerEvents = 'auto'),
    (document.getElementById('resetField').style.cursor = 'pointer'),
    (document.getElementById('delete').style.pointerEvents = 'auto'),
    (document.getElementById('fillBox').style.pointerEvents = 'auto'),
    (document.getElementById('fade').style.pointerEvents = 'auto'),
    (document.getElementById('dwnBtnFree').style.pointerEvents = 'auto'),
    (document.getElementById('textBtn').disabled = !1),
    (document.getElementById('tempsBtn').disabled = !1),
    (document.getElementById('imagesBtn').disabled = !1),
    (document.getElementById('bouncyArrow').style.display = 'none'),
    e)
  ) {
    case 'rect':
      rectFlag = !0
      break
    case 'circle':
      circleFlag = !0
      break
    case 'square':
      squareFlag = !0
      break
    case 'triangle':
      triangleFlag = !0
      break
    case 'hexagram':
      hexagramFlag = !0
      break
    case 'pentagon':
      pentagonFlag = !0
      break
    case 'nonagon':
      nonagonFlag = !0
      break
    case 'hexagon':
      hexagonFlag = !0
      break
    case 'star':
      starFlag = !0
      break
    case 'octagon':
      octagonFlag = !0
      break
    case 'twoSix':
      twoSixFlag = !0
      break
    case 'quad':
      quadFlag = !0
      break
    case 'oval':
      ovalFlag = !0
      break
    case 'line':
      lineFlag = !0
      break
    case 'cube':
      cubeFlag = !0
      break
  }
  $(function () {
    $('[data-bs-toggle="tooltip"]').tooltip({
      trigger: 'hover',
    }),
      $('[data-bs-toggle="tooltip"]').on('click', function () {
        $(this).tooltip('hide')
      })
  })
}
function textAround(e, t, l, n, o, a, d, i, c, r, s) {
  let m = document.getElementById('edit-text-around-box')
  l
    ? ($('#bold-icon-btn-around').val('clicked'),
      $('#bold-icon-btn-around')
        .children('img')
        .attr('src', 'images/bold-blue.svg'),
      $('#bold-icon-btn-around').addClass('textStyleSelected'))
    : ($('#bold-icon-btn-around').val(''),
      $('#bold-icon-btn-around').children('img').attr('src', 'images/bold.svg'),
      $('#bold-icon-btn-around').removeClass('textStyleSelected')),
    n
      ? ($('#italic-icon-btn-around').val('clicked'),
        $('#italic-icon-btn-around')
          .children('img')
          .attr('src', 'images/italic-blue.svg'),
        $('#italic-icon-btn-around').addClass('textStyleSelected'))
      : ($('#italic-icon-btn-around').val(''),
        $('#italic-icon-btn-around')
          .children('img')
          .attr('src', 'images/italic.svg'),
        $('#italic-icon-btn-around').removeClass('textStyleSelected')),
    o
      ? ($('#text-trans-icon-btn-around').val('clicked'),
        $('#text-trans-icon-btn-around')
          .children('img')
          .attr('src', 'images/tt-blue.svg'),
        $('#text-trans-icon-btn-around').addClass('textStyleSelected'))
      : ($('#text-trans-icon-btn-around').val(''),
        $('#text-trans-icon-btn-around')
          .children('img')
          .attr('src', 'images/textTransform.svg'),
        $('#text-trans-icon-btn-around').removeClass('textStyleSelected')),
    a
      ? ($('#invert-icon-btn-around').val('clicked'),
        $('#invert-icon-btn-around')
          .children('img')
          .attr('src', 'images/invert-blue.svg'),
        $('#invert-icon-btn-around').addClass('textStyleSelected'))
      : ($('#invert-icon-btn-around').val(''),
        $('#invert-icon-btn-around')
          .children('img')
          .attr('src', 'images/invert.svg'),
        $('#invert-icon-btn-around').removeClass('textStyleSelected')),
    d
      ? ($('#whiten-icon-btn-around').val('clicked'),
        $('#whiten-icon-btn-around')
          .children('img')
          .attr('src', 'images/text-whiten-blue.svg'),
        $('#whiten-icon-btn-around').addClass('textStyleSelected'))
      : ($('#whiten-icon-btn-around').val(''),
        $('#whiten-icon-btn-around')
          .children('img')
          .attr('src', 'images/text-whiten.svg'),
        $('#whiten-icon-btn-around').removeClass('textStyleSelected'))
  let u = m.cloneNode(!0)
  ;(u.id = shapeClone + '_editCircularText'),
    null != i &&
      '' != i &&
      null != i &&
      ((u.querySelector(
        '#circularTextInput :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1)'
      ).value = e),
      (u.querySelector(
        '#circularTextInput :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1)'
      ).value = e),
      (u.querySelector(
        '#circularFontSelect :nth-child(1) :nth-child(1)'
      ).value = t),
      (u.querySelector(
        '#circularFontSelect :nth-child(1) :nth-child(1)'
      ).value = t),
      (u.querySelector(
        '#textAroundFontSize :nth-child(2) :nth-child(1)'
      ).value = i),
      (u.querySelector(
        '#textAroundFontSize :nth-child(2) :nth-child(2)'
      ).value = i),
      (u.querySelector('#textAroundSpacing :nth-child(2) :nth-child(1)').value =
        c),
      (u.querySelector('#textAroundSpacing :nth-child(2) :nth-child(2)').value =
        c),
      (u.querySelector('#textAroundRadius :nth-child(2) :nth-child(1)').value =
        r),
      (u.querySelector('#textAroundRadius :nth-child(2) :nth-child(2)').value =
        r),
      (u.querySelector(
        '#textAroundRotation :nth-child(2) :nth-child(1)'
      ).value = s),
      (u.querySelector(
        '#textAroundRotation :nth-child(2) :nth-child(2)'
      ).value = s)),
    (u.querySelector(
      '#circularTextInput :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1)'
    ).id = shapeClone + 'circleText'),
    (u.querySelector('#circularFontSelect :nth-child(1) :nth-child(1)').id =
      shapeClone + 'circularTextFontSelect'),
    (u.querySelector('#textAroundFontSize :nth-child(2) :nth-child(2)').id =
      shapeClone + 'circularTextFontSize'),
    (u.querySelector('#textAroundSpacing :nth-child(2) :nth-child(2)').id =
      shapeClone + 'circularTextSpacing'),
    (u.querySelector('#textAroundRadius :nth-child(2) :nth-child(2)').id =
      shapeClone + 'circularTextRadius'),
    (u.querySelector('#textAroundRotation :nth-child(2) :nth-child(2)').id =
      shapeClone + 'circularTextRotation'),
    (u.querySelector('#bold-icon-btn-around').title = 'Bold'),
    (u.querySelector('#italic-icon-btn-around').title = 'Italic'),
    (u.querySelector('#text-trans-icon-btn-around').title = 'Uppercase'),
    (u.querySelector('#invert-icon-btn-around').title = 'Invert'),
    (u.querySelector('#whiten-icon-btn-around').title = 'Whiten'),
    (u.querySelector('#bold-icon-btn-around').id =
      shapeClone + '_circularTextBold'),
    (u.querySelector('#italic-icon-btn-around').id =
      shapeClone + '_circularTextItalic'),
    (u.querySelector('#text-trans-icon-btn-around').id =
      shapeClone + '_circularTextTransform'),
    (u.querySelector('#invert-icon-btn-around').id =
      shapeClone + '_circularTextInvert'),
    (u.querySelector('#whiten-icon-btn-around').id =
      shapeClone + '_circularTextWhiten'),
    (document.getElementById('edit-text-around-box').style.display = 'none'),
    (u.style.display = 'block')
  for (
    let e = 10;
    e < document.getElementById('editGroup').children.length;
    e++
  )
    document
      .getElementById('editGroup')
      .children[e].classList.add('hasNoControl')
  document.getElementById('editGroup').appendChild(u),
    (document.getElementById('edit-text-center-box').style.display = 'none'),
    (document.getElementById('edit-layers-box').style.display = 'block'),
    (document.getElementById('fill_span').style.color = '#009EF8'),
    (document.getElementById('fadeSpan').style.color = '#009EF8'),
    (document.getElementById('docViewText').style.color = '#009EF8'),
    (document.getElementById('docView').style.pointerEvents = 'auto'),
    (document.getElementById('fill-icon').style.filter = 'none'),
    (document.getElementById('start-box').style.display = 'none'),
    (document.getElementById('edit-image-box').style.display = 'none'),
    (document.getElementById('edit-shape-box').style.display = 'none'),
    (document.getElementById('edit-text-bottom-box').style.display = 'none'),
    (document.getElementById('edit-text-top-box').style.display = 'none'),
    (document.getElementById('edit-text-rect-box').style.display = 'none'),
    (document.getElementById('resetText').style.color = '#009EF8'),
    (document.getElementById('resetIcon').style.filter = ''),
    (document.getElementById('resetIcon').style.opacity = ''),
    (document.getElementById('deleteText').style.color = '#009EF8'),
    (document.getElementById('deleteIcon').style.filter = ''),
    (document.getElementById('deleteIcon').style.opacity = ''),
    (document.getElementById('resetField').style.pointerEvents = 'auto'),
    (document.getElementById('delete').style.pointerEvents = 'auto'),
    (document.getElementById('fade').style.pointerEvents = 'auto'),
    (document.getElementById('dwnBtnFree').style.pointerEvents = 'auto'),
    redoA.length > 0 &&
      (document.getElementById('redoText').style.color = '#009EF8'),
    (circularTextFlag = !0),
    $(function () {
      $('[data-bs-toggle="tooltip"]').tooltip({
        trigger: 'hover',
      }),
        $('[data-bs-toggle="tooltip"]').on('click', function () {
          $(this).tooltip('hide')
        })
    })
}
function textCenter(e, t, l, n, o, a, d, i, c, r, s) {
  let m = document.getElementById('edit-text-center-box')
  l
    ? ($('#bold-icon-btn-center').val('clicked'),
      $('#bold-icon-btn-center')
        .children('img')
        .attr('src', 'images/bold-blue.svg'),
      $('#bold-icon-btn-center').addClass('textStyleSelected'))
    : ($('#bold-icon-btn-center').val(''),
      $('#bold-icon-btn-center').children('img').attr('src', 'images/bold.svg'),
      $('#bold-icon-btn-center').removeClass('textStyleSelected')),
    n
      ? ($('#italic-icon-btn-center').val('clicked'),
        $('#italic-icon-btn-center')
          .children('img')
          .attr('src', 'images/italic-blue.svg'),
        $('#italic-icon-btn-center').addClass('textStyleSelected'))
      : ($('#italic-icon-btn-center').val(''),
        $('#italic-icon-btn-center')
          .children('img')
          .attr('src', 'images/italic.svg'),
        $('#italic-icon-btn-center').removeClass('textStyleSelected')),
    o
      ? ($('#text-trans-icon-btn-center').val('clicked'),
        $('#text-trans-icon-btn-center')
          .children('img')
          .attr('src', 'images/tt-blue.svg'),
        $('#text-trans-icon-btn-center').addClass('textStyleSelected'))
      : ($('#text-trans-icon-btn-center').val(''),
        $('#text-trans-icon-btn-center')
          .children('img')
          .attr('src', 'images/textTransform.svg'),
        $('#text-trans-icon-btn-center').removeClass('textStyleSelected')),
    a
      ? ($('#invert-icon-btn-center').val('clicked'),
        $('#invert-icon-btn-center')
          .children('img')
          .attr('src', 'images/invert-blue.svg'),
        $('#invert-icon-btn-center').addClass('textStyleSelected'))
      : ($('#invert-icon-btn-center').val(''),
        $('#invert-icon-btn-center')
          .children('img')
          .attr('src', 'images/invert.svg'),
        $('#invert-icon-btn-center').removeClass('textStyleSelected')),
    d
      ? ($('#whiten-icon-btn-center').val('clicked'),
        $('#whiten-icon-btn-center')
          .children('img')
          .attr('src', 'images/text-whiten-blue.svg'),
        $('#whiten-icon-btn-center').addClass('textStyleSelected'))
      : ($('#whiten-icon-btn-center').val(''),
        $('#whiten-icon-btn-center')
          .children('img')
          .attr('src', 'images/text-whiten.svg'),
        $('#whiten-icon-btn-center').removeClass('textStyleSelected'))
  let u = m.cloneNode(!0)
  ;(u.id = shapeClone + '_editCenterText'),
    null != i &&
      '' != i &&
      null != i &&
      ((u.querySelector(
        '#centerTextInput :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1)'
      ).value = e),
      (u.querySelector(
        '#centerTextInput :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1)'
      ).value = e),
      (u.querySelector('#centerFontSelect :nth-child(1) :nth-child(1)').value =
        t),
      (u.querySelector('#centerFontSelect :nth-child(1) :nth-child(1)').value =
        t),
      (u.querySelector(
        '#textCenterFontSize :nth-child(2) :nth-child(1) :nth-child(1) :nth-child(1)'
      ).value = i),
      (u.querySelector(
        '#textCenterFontSize :nth-child(2) :nth-child(1) :nth-child(1) :nth-child(2)'
      ).value = i),
      (u.querySelector(
        '#textCenterHorizontal :nth-child(2) :nth-child(1) :nth-child(1) :nth-child(1)'
      ).value = c),
      (u.querySelector(
        '#textCenterHorizontal :nth-child(2) :nth-child(1) :nth-child(1) :nth-child(2)'
      ).value = c),
      (u.querySelector(
        '#textCenterVertical :nth-child(2) :nth-child(1) :nth-child(1) :nth-child(1)'
      ).value = r),
      (u.querySelector(
        '#textCenterVertical :nth-child(2) :nth-child(1) :nth-child(1) :nth-child(2)'
      ).value = r),
      (u.querySelector(
        '#textCenterRotation :nth-child(2) :nth-child(1) :nth-child(1) :nth-child(1)'
      ).value = s),
      (u.querySelector(
        '#textCenterRotation :nth-child(2) :nth-child(1) :nth-child(1) :nth-child(2)'
      ).value = s)),
    (u.querySelector(
      '#centerTextInput :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1)'
    ).id = shapeClone + 'centerText'),
    (u.querySelector('#centerFontSelect :nth-child(1) :nth-child(1)').id =
      shapeClone + 'centerTextFontSelect'),
    (u.querySelector('#textCenterFontSize :nth-child(2) :nth-child(2)').id =
      shapeClone + 'centerTextFontSize'),
    (u.querySelector('#textCenterHorizontal :nth-child(2) :nth-child(2)').id =
      shapeClone + 'centerTextHorizontal'),
    (u.querySelector('#textCenterVertical :nth-child(2) :nth-child(2)').id =
      shapeClone + 'centerTextVertical'),
    (u.querySelector('#textCenterRotation :nth-child(2) :nth-child(2)').id =
      shapeClone + 'centerTextRotation'),
    (u.querySelector('#bold-icon-btn-center').title = 'Bold'),
    (u.querySelector('#italic-icon-btn-center').title = 'Italic'),
    (u.querySelector('#text-trans-icon-btn-center').title = 'Uppercase'),
    (u.querySelector('#invert-icon-btn-center').title = 'Invert'),
    (u.querySelector('#whiten-icon-btn-center').title = 'Whiten'),
    (u.querySelector('#bold-icon-btn-center').id =
      shapeClone + '_centerTextBold'),
    (u.querySelector('#italic-icon-btn-center').id =
      shapeClone + '_centerTextItalic'),
    (u.querySelector('#text-trans-icon-btn-center').id =
      shapeClone + '_centerTextTransform'),
    (u.querySelector('#invert-icon-btn-center').id =
      shapeClone + '_centerTextInvert'),
    (u.querySelector('#whiten-icon-btn-center').id =
      shapeClone + '_centerTextWhiten'),
    (document.getElementById('edit-text-center-box').style.display = 'none'),
    (u.style.display = 'block')
  for (
    let e = 10;
    e < document.getElementById('editGroup').children.length;
    e++
  )
    document
      .getElementById('editGroup')
      .children[e].classList.add('hasNoControl')
  document.getElementById('editGroup').appendChild(u),
    (document.getElementById('edit-text-around-box').style.display = 'none'),
    (document.getElementById('edit-layers-box').style.display = 'block'),
    (document.getElementById('fill_span').style.color = '#009EF8'),
    (document.getElementById('fadeSpan').style.color = '#009EF8'),
    (document.getElementById('docViewText').style.color = '#009EF8'),
    (document.getElementById('docView').style.pointerEvents = 'auto'),
    (document.getElementById('fill-icon').style.filter = 'none'),
    (document.getElementById('start-box').style.display = 'none'),
    (document.getElementById('edit-image-box').style.display = 'none'),
    (document.getElementById('edit-shape-box').style.display = 'none'),
    (document.getElementById('edit-text-bottom-box').style.display = 'none'),
    (document.getElementById('edit-text-top-box').style.display = 'none'),
    (document.getElementById('edit-text-rect-box').style.display = 'none'),
    (document.getElementById('resetText').style.color = '#009EF8'),
    (document.getElementById('resetIcon').style.filter = ''),
    (document.getElementById('resetIcon').style.opacity = ''),
    (document.getElementById('deleteText').style.color = '#009EF8'),
    (document.getElementById('deleteIcon').style.filter = ''),
    (document.getElementById('deleteIcon').style.opacity = ''),
    (document.getElementById('resetField').style.pointerEvents = 'auto'),
    (document.getElementById('delete').style.pointerEvents = 'auto'),
    (document.getElementById('fade').style.pointerEvents = 'auto'),
    (document.getElementById('dwnBtnFree').style.pointerEvents = 'auto'),
    (centerTextFlag = !0),
    $(function () {
      $('[data-bs-toggle="tooltip"]').tooltip({
        trigger: 'hover',
      }),
        $('[data-bs-toggle="tooltip"]').on('click', function () {
          $(this).tooltip('hide')
        })
    })
}
function textBottom(e, t, l, n, o, a, d, i, c, r, s, m) {
  let u = document.getElementById('edit-text-bottom-box')
  a
    ? ($('#bold-icon-btn-bottom').val('clicked'),
      $('#bold-icon-btn-bottom')
        .children('img')
        .attr('src', 'images/bold-blue.svg'),
      $('#bold-icon-btn-bottom').addClass('textStyleSelected'))
    : ($('#bold-icon-btn-bottom').val(''),
      $('#bold-icon-btn-bottom').children('img').attr('src', 'images/bold.svg'),
      $('#bold-icon-btn-bottom').removeClass('textStyleSelected')),
    d
      ? ($('#italic-icon-btn-bottom').val('clicked'),
        $('#italic-icon-btn-bottom')
          .children('img')
          .attr('src', 'images/italic-blue.svg'),
        $('#italic-icon-btn-bottom').addClass('textStyleSelected'))
      : ($('#italic-icon-btn-bottom').val(''),
        $('#italic-icon-btn-bottom')
          .children('img')
          .attr('src', 'images/italic.svg'),
        $('#italic-icon-btn-bottom').removeClass('textStyleSelected')),
    i
      ? ($('#text-trans-icon-btn-bottom').val('clicked'),
        $('#text-trans-icon-btn-bottom')
          .children('img')
          .attr('src', 'images/tt-blue.svg'),
        $('#text-trans-icon-btn-bottom').addClass('textStyleSelected'))
      : ($('#text-trans-icon-btn-bottom').val(''),
        $('#text-trans-icon-btn-bottom')
          .children('img')
          .attr('src', 'images/textTransform.svg'),
        $('#text-trans-icon-btn-bottom').removeClass('textStyleSelected')),
    c
      ? ($('#invert-icon-btn-bottom').val('clicked'),
        $('#invert-icon-btn-bottom')
          .children('img')
          .attr('src', 'images/invert-blue.svg'),
        $('#invert-icon-btn-bottom').addClass('textStyleSelected'))
      : ($('#invert-icon-btn-bottom').val(''),
        $('#invert-icon-btn-bottom')
          .children('img')
          .attr('src', 'images/invert.svg'),
        $('#invert-icon-btn-bottom').removeClass('textStyleSelected')),
    r
      ? ($('#whiten-icon-btn-bottom').val('clicked'),
        $('#whiten-icon-btn-bottom')
          .children('img')
          .attr('src', 'images/text-whiten-blue.svg'),
        $('#whiten-icon-btn-bottom').addClass('textStyleSelected'))
      : ($('#whiten-icon-btn-bottom').val(''),
        $('#whiten-icon-btn-bottom')
          .children('img')
          .attr('src', 'images/text-whiten.svg'),
        $('#whiten-icon-btn-bottom').removeClass('textStyleSelected'))
  let y = u.cloneNode(!0)
  ;(y.id = shapeClone + '_editBottomText'),
    null != s &&
      '' != s &&
      null != s &&
      ((y.querySelector(
        '#bottomTextInput :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1)'
      ).value = e),
      (y.querySelector(
        '#bottomTextInput :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1)'
      ).value = e),
      (y.querySelector(
        '#bottomTextInput1 :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1)'
      ).value = t),
      (y.querySelector(
        '#bottomTextInput1 :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1)'
      ).value = t),
      (y.querySelector(
        '#bottomTextInput2 :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1)'
      ).value = l),
      (y.querySelector(
        '#bottomTextInput2 :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1)'
      ).value = l),
      (y.querySelector(
        '#bottomTextInput3 :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1)'
      ).value = n),
      (y.querySelector(
        '#bottomTextInput3 :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1)'
      ).value = n),
      (y.querySelector('#bottomFontSelect :nth-child(1) :nth-child(1)').value =
        o),
      (y.querySelector('#bottomFontSelect :nth-child(1) :nth-child(1)').value =
        o),
      (y.querySelector(
        '#textBottomFontSize :nth-child(1) :nth-child(1)'
      ).value = s),
      (y.querySelector(
        '#textBottomFontSize :nth-child(1) :nth-child(1)'
      ).value = s),
      (y.querySelector('#textBottomRadius :nth-child(2) :nth-child(1)').value =
        m),
      (y.querySelector('#textBottomRadius :nth-child(2) :nth-child(1)').value =
        m)),
    (y.querySelector(
      '#bottomTextInput :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1)'
    ).id = shapeClone + 'bottomText'),
    (y.querySelector(
      '#bottomTextInput1 :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1)'
    ).id = shapeClone + 'bottomText1'),
    (y.querySelector(
      '#bottomTextInput2 :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1)'
    ).id = shapeClone + 'bottomText2'),
    (y.querySelector(
      '#bottomTextInput3 :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1)'
    ).id = shapeClone + 'bottomText3'),
    (y.querySelector('#bottomFontSelect :nth-child(1) :nth-child(1)').id =
      shapeClone + 'bottomTextFontSelect'),
    (y.querySelector('#textBottomFontSize :nth-child(1) :nth-child(2)').id =
      shapeClone + 'bottomTextFontSize'),
    (y.querySelector('#textBottomRadius :nth-child(2) :nth-child(2)').id =
      shapeClone + 'bottomTextRadius'),
    (y.querySelector('#bold-icon-btn-bottom').title = 'Bold'),
    (y.querySelector('#italic-icon-btn-bottom').title = 'Italic'),
    (y.querySelector('#text-trans-icon-btn-bottom').title = 'Uppercase'),
    (y.querySelector('#invert-icon-btn-bottom').title = 'Invert'),
    (y.querySelector('#whiten-icon-btn-bottom').title = 'Whiten'),
    (y.querySelector('#bold-icon-btn-bottom').id =
      shapeClone + '_bottomTextBold'),
    (y.querySelector('#italic-icon-btn-bottom').id =
      shapeClone + '_bottomTextItalic'),
    (y.querySelector('#text-trans-icon-btn-bottom').id =
      shapeClone + '_bottomTextTransform'),
    (y.querySelector('#invert-icon-btn-bottom').id =
      shapeClone + '_bottomTextInvert'),
    (y.querySelector('#whiten-icon-btn-bottom').id =
      shapeClone + '_bottomTextWhiten'),
    (document.getElementById('edit-text-bottom-box').style.display = 'none'),
    (y.style.display = 'block')
  for (
    let e = 10;
    e < document.getElementById('editGroup').children.length;
    e++
  )
    document
      .getElementById('editGroup')
      .children[e].classList.add('hasNoControl')
  document.getElementById('editGroup').appendChild(y),
    (document.getElementById('edit-text-around-box').style.display = 'none'),
    (document.getElementById('edit-text-center-box').style.display = 'none'),
    (document.getElementById('edit-layers-box').style.display = 'block'),
    (document.getElementById('fill_span').style.color = '#009EF8'),
    (document.getElementById('fadeSpan').style.color = '#009EF8'),
    (document.getElementById('docViewText').style.color = '#009EF8'),
    (document.getElementById('docView').style.pointerEvents = 'auto'),
    (document.getElementById('fill-icon').style.filter = 'none'),
    (document.getElementById('start-box').style.display = 'none'),
    (document.getElementById('edit-image-box').style.display = 'none'),
    (document.getElementById('edit-shape-box').style.display = 'none'),
    (document.getElementById('edit-text-top-box').style.display = 'none'),
    (document.getElementById('edit-text-rect-box').style.display = 'none'),
    (document.getElementById('resetText').style.color = '#009EF8'),
    (document.getElementById('resetIcon').style.filter = ''),
    (document.getElementById('resetIcon').style.opacity = ''),
    (document.getElementById('deleteText').style.color = '#009EF8'),
    (document.getElementById('deleteIcon').style.filter = ''),
    (document.getElementById('deleteIcon').style.opacity = ''),
    (document.getElementById('resetField').style.pointerEvents = 'auto'),
    (document.getElementById('delete').style.pointerEvents = 'auto'),
    (document.getElementById('fade').style.pointerEvents = 'auto'),
    (document.getElementById('dwnBtnFree').style.pointerEvents = 'auto'),
    (bottomTextFlag = !0),
    $(function () {
      $('[data-bs-toggle="tooltip"]').tooltip({
        trigger: 'hover',
      }),
        $('[data-bs-toggle="tooltip"]').on('click', function () {
          $(this).tooltip('hide')
        })
    })
}
function textTop(e, t, l, n, o, a, d, i, c, r, s) {
  let m = document.getElementById('edit-text-top-box')
  o
    ? ($('#bold-icon-btn-top').val('clicked'),
      $('#bold-icon-btn-top')
        .children('img')
        .attr('src', 'images/bold-blue.svg'),
      $('#bold-icon-btn-top').addClass('textStyleSelected'))
    : ($('#bold-icon-btn-top').val(''),
      $('#bold-icon-btn-top').children('img').attr('src', 'images/bold.svg'),
      $('#bold-icon-btn-top').removeClass('textStyleSelected')),
    a
      ? ($('#italic-icon-btn-top').val('clicked'),
        $('#italic-icon-btn-top')
          .children('img')
          .attr('src', 'images/italic-blue.svg'),
        $('#italic-icon-btn-top').addClass('textStyleSelected'))
      : ($('#italic-icon-btn-top').val(''),
        $('#italic-icon-btn-top')
          .children('img')
          .attr('src', 'images/italic.svg'),
        $('#italic-icon-btn-top').removeClass('textStyleSelected')),
    d
      ? ($('#text-trans-icon-btn-top').val('clicked'),
        $('#text-trans-icon-btn-top')
          .children('img')
          .attr('src', 'images/tt-blue.svg'),
        $('#text-trans-icon-btn-top').addClass('textStyleSelected'))
      : ($('#text-trans-icon-btn-top').val(''),
        $('#text-trans-icon-btn-top')
          .children('img')
          .attr('src', 'images/textTransform.svg'),
        $('#text-trans-icon-btn-top').removeClass('textStyleSelected')),
    i
      ? ($('#invert-icon-btn-top').val('clicked'),
        $('#invert-icon-btn-top')
          .children('img')
          .attr('src', 'images/invert-blue.svg'),
        $('#invert-icon-btn-top').addClass('textStyleSelected'))
      : ($('#invert-icon-btn-top').val(''),
        $('#invert-icon-btn-top')
          .children('img')
          .attr('src', 'images/invert.svg'),
        $('#invert-icon-btn-top').removeClass('textStyleSelected')),
    c
      ? ($('#whiten-icon-btn-top').val('clicked'),
        $('#whiten-icon-btn-top')
          .children('img')
          .attr('src', 'images/text-whiten-blue.svg'),
        $('#whiten-icon-btn-top').addClass('textStyleSelected'))
      : ($('#whiten-icon-btn-top').val(''),
        $('#whiten-icon-btn-top')
          .children('img')
          .attr('src', 'images/text-whiten.svg'),
        $('#whiten-icon-btn-top').removeClass('textStyleSelected'))
  let u = m.cloneNode(!0)
  ;(u.id = shapeClone + '_editTopText'),
    null != r &&
      '' != r &&
      null != r &&
      ((u.querySelector(
        '#topTextInput :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1)'
      ).value = e),
      (u.querySelector(
        '#topTextInput :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1)'
      ).value = e),
      (u.querySelector(
        '#topTextInput1 :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1)'
      ).value = t),
      (u.querySelector(
        '#topTextInput1 :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1)'
      ).value = t),
      (u.querySelector(
        '#topTextInput2 :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1)'
      ).value = l),
      (u.querySelector(
        '#topTextInput2 :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1)'
      ).value = l),
      (u.querySelector('#topFontSelect :nth-child(1) :nth-child(1)').value = n),
      (u.querySelector('#topFontSelect :nth-child(1) :nth-child(1)').value = n),
      (u.querySelector('#textTopFontSize :nth-child(1) :nth-child(1)').value =
        r),
      (u.querySelector('#textTopFontSize :nth-child(1) :nth-child(2)').value =
        r),
      (u.querySelector(
        '#textTopRadius :nth-child(2) :nth-child(1) :nth-child(1) :nth-child(1)'
      ).value = s),
      (u.querySelector(
        '#textTopRadius :nth-child(2) :nth-child(1) :nth-child(1) :nth-child(2)'
      ).value = s)),
    (u.querySelector(
      '#topTextInput :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1)'
    ).id = shapeClone + 'topText'),
    (u.querySelector(
      '#topTextInput1 :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1)'
    ).id = shapeClone + 'topText1'),
    (u.querySelector(
      '#topTextInput2 :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1)'
    ).id = shapeClone + 'topText2'),
    (u.querySelector('#topFontSelect :nth-child(1) :nth-child(1)').id =
      shapeClone + 'topTextFontSelect'),
    (u.querySelector('#textTopFontSize :nth-child(1) :nth-child(2)').id =
      shapeClone + 'topTextFontSize'),
    (u.querySelector('#textTopRadius :nth-child(2) :nth-child(2)').id =
      shapeClone + 'topTextRadius'),
    (u.querySelector('#bold-icon-btn-top').title = 'Bold'),
    (u.querySelector('#italic-icon-btn-top').title = 'Italic'),
    (u.querySelector('#text-trans-icon-btn-top').title = 'Uppercase'),
    (u.querySelector('#invert-icon-btn-top').title = 'Invert'),
    (u.querySelector('#whiten-icon-btn-top').title = 'Whiten'),
    (u.querySelector('#bold-icon-btn-top').id = shapeClone + '_topTextBold'),
    (u.querySelector('#italic-icon-btn-top').id =
      shapeClone + '_topTextItalic'),
    (u.querySelector('#text-trans-icon-btn-top').id =
      shapeClone + '_topTextTransform'),
    (u.querySelector('#invert-icon-btn-top').id =
      shapeClone + '_topTextInvert'),
    (u.querySelector('#whiten-icon-btn-top').id =
      shapeClone + '_topTextWhiten'),
    (document.getElementById('edit-text-top-box').style.display = 'none'),
    (u.style.display = 'block')
  for (
    let e = 10;
    e < document.getElementById('editGroup').children.length;
    e++
  )
    document
      .getElementById('editGroup')
      .children[e].classList.add('hasNoControl')
  document.getElementById('editGroup').appendChild(u),
    (document.getElementById('edit-text-around-box').style.display = 'none'),
    (document.getElementById('edit-text-center-box').style.display = 'none'),
    (document.getElementById('edit-text-bottom-box').style.display = 'none'),
    (document.getElementById('edit-text-rect-box').style.display = 'none'),
    (document.getElementById('edit-layers-box').style.display = 'block'),
    (document.getElementById('fill_span').style.color = '#009EF8'),
    (document.getElementById('fadeSpan').style.color = '#009EF8'),
    (document.getElementById('docViewText').style.color = '#009EF8'),
    (document.getElementById('docView').style.pointerEvents = 'auto'),
    (document.getElementById('fill-icon').style.filter = 'none'),
    (document.getElementById('start-box').style.display = 'none'),
    (document.getElementById('edit-image-box').style.display = 'none'),
    (document.getElementById('edit-shape-box').style.display = 'none'),
    (document.getElementById('resetText').style.color = '#009EF8'),
    (document.getElementById('resetIcon').style.filter = ''),
    (document.getElementById('resetIcon').style.opacity = ''),
    (document.getElementById('deleteText').style.color = '#009EF8'),
    (document.getElementById('deleteIcon').style.filter = ''),
    (document.getElementById('deleteIcon').style.opacity = ''),
    (document.getElementById('resetField').style.pointerEvents = 'auto'),
    (document.getElementById('delete').style.pointerEvents = 'auto'),
    (document.getElementById('fade').style.pointerEvents = 'auto'),
    (document.getElementById('dwnBtnFree').style.pointerEvents = 'auto'),
    (topTextFlag = !0),
    $(function () {
      $('[data-bs-toggle="tooltip"]').tooltip({
        trigger: 'hover',
      }),
        $('[data-bs-toggle="tooltip"]').on('click', function () {
          $(this).tooltip('hide')
        })
    })
}
function textRect(e, t, l, n, o, a, d, i, c, r, s, m) {
  let u = document.getElementById('edit-text-rect-box')
  a
    ? ($('#bold-icon-btn-rect').val('clicked'),
      $('#bold-icon-btn-rect')
        .children('img')
        .attr('src', 'images/bold-blue.svg'),
      $('#bold-icon-btn-rect').addClass('textStyleSelected'))
    : ($('#bold-icon-btn-rect').val(''),
      $('#bold-icon-btn-rect').children('img').attr('src', 'images/bold.svg'),
      $('#bold-icon-btn-rect').removeClass('textStyleSelected')),
    d
      ? ($('#italic-icon-btn-rect').val('clicked'),
        $('#italic-icon-btn-rect')
          .children('img')
          .attr('src', 'images/italic-blue.svg'),
        $('#italic-icon-btn-rect').addClass('textStyleSelected'))
      : ($('#italic-icon-btn-rect').val(''),
        $('#italic-icon-btn-rect')
          .children('img')
          .attr('src', 'images/italic.svg'),
        $('#italic-icon-btn-rect').removeClass('textStyleSelected')),
    i
      ? ($('#text-trans-icon-btn-rect').val('clicked'),
        $('#text-trans-icon-btn-rect')
          .children('img')
          .attr('src', 'images/tt-blue.svg'),
        $('#text-trans-icon-btn-rect').addClass('textStyleSelected'))
      : ($('#text-trans-icon-btn-rect').val(''),
        $('#text-trans-icon-btn-rect')
          .children('img')
          .attr('src', 'images/textTransform.svg'),
        $('#text-trans-icon-btn-rect').removeClass('textStyleSelected')),
    c
      ? ($('#invert-icon-btn-rect').val('clicked'),
        $('#invert-icon-btn-rect')
          .children('img')
          .attr('src', 'images/invert-blue.svg'),
        $('#invert-icon-btn-rect').addClass('textStyleSelected'))
      : ($('#invert-icon-btn-rect').val(''),
        $('#invert-icon-btn-rect')
          .children('img')
          .attr('src', 'images/invert.svg'),
        $('#invert-icon-btn-rect').removeClass('textStyleSelected')),
    r
      ? ($('#whiten-icon-btn-rect').val('clicked'),
        $('#whiten-icon-btn-rect')
          .children('img')
          .attr('src', 'images/text-whiten-blue.svg'),
        $('#whiten-icon-btn-rect').addClass('textStyleSelected'))
      : ($('#whiten-icon-btn-rect').val(''),
        $('#whiten-icon-btn-rect')
          .children('img')
          .attr('src', 'images/text-whiten.svg'),
        $('#whiten-icon-btn-rect').removeClass('textStyleSelected'))
  let y = u.cloneNode(!0)
  ;(y.id = shapeClone + '_editRectText'),
    null != s &&
      '' != s &&
      null != s &&
      ((y.querySelector(
        '#rectTextInput :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1)'
      ).value = e),
      (y.querySelector(
        '#rectTextInput :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1)'
      ).value = e),
      (y.querySelector(
        '#rectTextInput1 :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1)'
      ).value = t),
      (y.querySelector(
        '#rectTextInput1 :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1)'
      ).value = t),
      (y.querySelector(
        '#rectTextInput2 :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1)'
      ).value = l),
      (y.querySelector(
        '#rectTextInput2 :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1)'
      ).value = l),
      (y.querySelector(
        '#rectTextInput3 :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1)'
      ).value = n),
      (y.querySelector(
        '#rectTextInput3 :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1)'
      ).value = n),
      (y.querySelector('#rectFontSelect :nth-child(1) :nth-child(1)').value =
        o),
      (y.querySelector('#rectFontSelect :nth-child(1) :nth-child(1)').value =
        o),
      (y.querySelector('#textRectFontSize :nth-child(1) :nth-child(1)').value =
        s),
      (y.querySelector('#textRectFontSize :nth-child(1) :nth-child(2)').value =
        s),
      (y.querySelector(
        '#textRectRadius :nth-child(2) :nth-child(1) :nth-child(1) :nth-child(1)'
      ).value = m),
      (y.querySelector(
        '#textRectRadius :nth-child(2) :nth-child(1) :nth-child(1) :nth-child(2)'
      ).value = m)),
    (y.querySelector(
      '#rectTextInput :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1)'
    ).id = shapeClone + 'rectText'),
    (y.querySelector(
      '#rectTextInput1 :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1)'
    ).id = shapeClone + 'rectText1'),
    (y.querySelector(
      '#rectTextInput2 :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1)'
    ).id = shapeClone + 'rectText2'),
    (y.querySelector(
      '#rectTextInput3 :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1)'
    ).id = shapeClone + 'rectText3'),
    (y.querySelector('#rectFontSelect :nth-child(1) :nth-child(1)').id =
      shapeClone + 'rectTextFontSelect'),
    (y.querySelector('#textRectFontSize :nth-child(1) :nth-child(2)').id =
      shapeClone + 'rectTextFontSize'),
    (y.querySelector('#textRectRadius :nth-child(2) :nth-child(2)').id =
      shapeClone + 'rectTextRadius'),
    (y.querySelector('#bold-icon-btn-rect').title = 'Bold'),
    (y.querySelector('#italic-icon-btn-rect').title = 'Italic'),
    (y.querySelector('#text-trans-icon-btn-rect').title = 'Uppercase'),
    (y.querySelector('#invert-icon-btn-rect').title = 'Invert'),
    (y.querySelector('#whiten-icon-btn-rect').title = 'Whiten'),
    (y.querySelector('#bold-icon-btn-rect').id = shapeClone + '_rectTextBold'),
    (y.querySelector('#italic-icon-btn-rect').id =
      shapeClone + '_rectTextItalic'),
    (y.querySelector('#text-trans-icon-btn-rect').id =
      shapeClone + '_rectTextTransform'),
    (y.querySelector('#invert-icon-btn-rect').id =
      shapeClone + '_rectTextInvert'),
    (y.querySelector('#whiten-icon-btn-rect').id =
      shapeClone + '_rectTextWhiten'),
    (document.getElementById('edit-text-rect-box').style.display = 'none'),
    (y.style.display = 'block')
  for (
    let e = 10;
    e < document.getElementById('editGroup').children.length;
    e++
  )
    document
      .getElementById('editGroup')
      .children[e].classList.add('hasNoControl')
  document.getElementById('editGroup').appendChild(y),
    (document.getElementById('edit-text-around-box').style.display = 'none'),
    (document.getElementById('edit-text-center-box').style.display = 'none'),
    (document.getElementById('edit-text-top-box').style.display = 'none'),
    (document.getElementById('edit-text-bottom-box').style.display = 'none'),
    (document.getElementById('edit-text-rect-box').style.display = 'none'),
    (document.getElementById('edit-layers-box').style.display = 'block'),
    (document.getElementById('fill_span').style.color = '#009EF8'),
    (document.getElementById('fadeSpan').style.color = '#009EF8'),
    (document.getElementById('docViewText').style.color = '#009EF8'),
    (document.getElementById('docView').style.pointerEvents = 'auto'),
    (document.getElementById('docView').style.pointerEvents = 'auto'),
    (document.getElementById('fill-icon').style.filter = 'none'),
    (document.getElementById('start-box').style.display = 'none'),
    (document.getElementById('edit-image-box').style.display = 'none'),
    (document.getElementById('edit-shape-box').style.display = 'none'),
    (document.getElementById('resetText').style.color = '#009EF8'),
    (document.getElementById('resetIcon').style.filter = ''),
    (document.getElementById('resetIcon').style.opacity = ''),
    (document.getElementById('deleteText').style.color = '#009EF8'),
    (document.getElementById('deleteIcon').style.filter = ''),
    (document.getElementById('deleteIcon').style.opacity = ''),
    (document.getElementById('resetField').style.pointerEvents = 'auto'),
    (document.getElementById('delete').style.pointerEvents = 'auto'),
    (document.getElementById('fade').style.pointerEvents = 'auto'),
    (document.getElementById('dwnBtnFree').style.pointerEvents = 'auto'),
    (rectTextFlag = !0),
    $(function () {
      $('[data-bs-toggle="tooltip"]').tooltip({
        trigger: 'hover',
      }),
        $('[data-bs-toggle="tooltip"]').on('click', function () {
          $(this).tooltip('hide')
        })
    })
}
function textOval(e, t, l, n, o, a, d, i, c, r, s) {
  let m = document.getElementById('edit-text-oval-box')
  l
    ? ($('#bold-icon-btn-oval').val('clicked'),
      $('#bold-icon-btn-oval')
        .children('img')
        .attr('src', 'images/bold-blue.svg'),
      $('#bold-icon-btn-oval').addClass('textStyleSelected'))
    : ($('#bold-icon-btn-oval').val(''),
      $('#bold-icon-btn-oval').children('img').attr('src', 'images/bold.svg'),
      $('#bold-icon-btn-oval').removeClass('textStyleSelected')),
    n
      ? ($('#italic-icon-btn-oval').val('clicked'),
        $('#italic-icon-btn-oval')
          .children('img')
          .attr('src', 'images/italic-blue.svg'),
        $('#italic-icon-btn-oval').addClass('textStyleSelected'))
      : ($('#italic-icon-btn-oval').val(''),
        $('#italic-icon-btn-oval')
          .children('img')
          .attr('src', 'images/italic.svg'),
        $('#italic-icon-btn-oval').removeClass('textStyleSelected')),
    o
      ? ($('#text-trans-icon-btn-oval').val('clicked'),
        $('#text-trans-icon-btn-oval')
          .children('img')
          .attr('src', 'images/tt-blue.svg'),
        $('#text-trans-icon-btn-oval').addClass('textStyleSelected'))
      : ($('#text-trans-icon-btn-oval').val(''),
        $('#text-trans-icon-btn-oval')
          .children('img')
          .attr('src', 'images/textTransform.svg'),
        $('#text-trans-icon-btn-oval').removeClass('textStyleSelected')),
    $('#invert-icon-btn-oval').hide(),
    d
      ? ($('#whiten-icon-btn-oval').val('clicked'),
        $('#whiten-icon-btn-oval')
          .children('img')
          .attr('src', 'images/text-whiten-blue.svg'),
        $('#whiten-icon-btn-oval').addClass('textStyleSelected'))
      : ($('#whiten-icon-btn-oval').val(''),
        $('#whiten-icon-btn-oval')
          .children('img')
          .attr('src', 'images/text-whiten.svg'),
        $('#whiten-icon-btn-oval').removeClass('textStyleSelected'))
  let u = m.cloneNode(!0)
  ;(u.id = shapeClone + '_editOvalText'),
    null != i &&
      '' != i &&
      null != i &&
      ((u.querySelector(
        '#ovalTextInput :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1)'
      ).value = e),
      (u.querySelector(
        '#ovalTextInput :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1)'
      ).value = e),
      (u.querySelector('#ovalFontSelect :nth-child(1) :nth-child(1)').value =
        t),
      (u.querySelector('#ovalFontSelect :nth-child(1) :nth-child(1)').value =
        t),
      (u.querySelector('#textOvalFontSize :nth-child(2) :nth-child(1)').value =
        i),
      (u.querySelector('#textOvalFontSize :nth-child(2) :nth-child(2)').value =
        i),
      (u.querySelector('#textOvalSpacing :nth-child(2) :nth-child(1)').value =
        c),
      (u.querySelector('#textOvalSpacing :nth-child(2) :nth-child(2)').value =
        c),
      (u.querySelector('#textOvalRadius :nth-child(2) :nth-child(1)').value =
        r),
      (u.querySelector('#textOvalRadius :nth-child(2) :nth-child(2)').value =
        r),
      (u.querySelector('#textOvalRotation :nth-child(2) :nth-child(1)').value =
        s),
      (u.querySelector('#textOvalRotation :nth-child(2) :nth-child(2)').value =
        s)),
    (u.querySelector(
      '#ovalTextInput :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1)'
    ).id = shapeClone + 'ovalText'),
    (u.querySelector('#ovalFontSelect :nth-child(1) :nth-child(1)').id =
      shapeClone + 'ovalTextFontSelect'),
    (u.querySelector('#textOvalFontSize :nth-child(2) :nth-child(2)').id =
      shapeClone + 'ovalTextFontSize'),
    (u.querySelector('#textOvalSpacing :nth-child(2) :nth-child(2)').id =
      shapeClone + 'ovalTextSpacing'),
    (u.querySelector('#textOvalRadius :nth-child(2) :nth-child(2)').id =
      shapeClone + 'ovalTextRadius'),
    (u.querySelector('#textOvalRadius :nth-child(2) :nth-child(1)').value =
      shapeClone + 'ovalTextRadius'),
    (u.querySelector('#textOvalRotation :nth-child(2) :nth-child(2)').id =
      shapeClone + 'ovalTextRotation'),
    (u.querySelector('#bold-icon-btn-oval').title = 'Bold'),
    (u.querySelector('#italic-icon-btn-oval').title = 'Italic'),
    (u.querySelector('#text-trans-icon-btn-oval').title = 'Uppercase'),
    (u.querySelector('#invert-icon-btn-oval').title = 'Invert'),
    (u.querySelector('#whiten-icon-btn-oval').title = 'Whiten'),
    (u.querySelector('#bold-icon-btn-oval').id = shapeClone + '_ovalTextBold'),
    (u.querySelector('#italic-icon-btn-oval').id =
      shapeClone + '_ovalTextItalic'),
    (u.querySelector('#text-trans-icon-btn-oval').id =
      shapeClone + '_ovalTextTransform'),
    (u.querySelector('#invert-icon-btn-oval').id =
      shapeClone + '_ovalTextInvert'),
    (u.querySelector('#whiten-icon-btn-oval').id =
      shapeClone + '_ovalTextWhiten'),
    (document.getElementById('edit-text-oval-box').style.display = 'none'),
    (u.style.display = 'block')
  for (
    let e = 10;
    e < document.getElementById('editGroup').children.length;
    e++
  )
    document
      .getElementById('editGroup')
      .children[e].classList.add('hasNoControl')
  document.getElementById('editGroup').appendChild(u),
    (document.getElementById('edit-text-center-box').style.display = 'none'),
    (document.getElementById('edit-layers-box').style.display = 'block'),
    (document.getElementById('fill_span').style.color = '#009EF8'),
    (document.getElementById('fadeSpan').style.color = '#009EF8'),
    (document.getElementById('docViewText').style.color = '#009EF8'),
    (document.getElementById('docView').style.pointerEvents = 'auto'),
    (document.getElementById('fill-icon').style.filter = 'none'),
    (document.getElementById('start-box').style.display = 'none'),
    (document.getElementById('edit-image-box').style.display = 'none'),
    (document.getElementById('edit-shape-box').style.display = 'none'),
    (document.getElementById('edit-text-bottom-box').style.display = 'none'),
    (document.getElementById('edit-text-top-box').style.display = 'none'),
    (document.getElementById('edit-text-rect-box').style.display = 'none'),
    (document.getElementById('resetText').style.color = '#009EF8'),
    (document.getElementById('resetIcon').style.filter = ''),
    (document.getElementById('resetIcon').style.opacity = ''),
    (document.getElementById('deleteText').style.color = '#009EF8'),
    (document.getElementById('deleteIcon').style.filter = ''),
    (document.getElementById('deleteIcon').style.opacity = ''),
    (document.getElementById('resetField').style.pointerEvents = 'auto'),
    (document.getElementById('delete').style.pointerEvents = 'auto'),
    (document.getElementById('fade').style.pointerEvents = 'auto'),
    (document.getElementById('dwnBtnFree').style.pointerEvents = 'auto'),
    (ovalTextFlag = !0),
    $(function () {
      $('[data-bs-toggle="tooltip"]').tooltip({
        trigger: 'hover',
      }),
        $('[data-bs-toggle="tooltip"]').on('click', function () {
          $(this).tooltip('hide')
        })
    })
}
function textQuad(e, t, l, n, o, a, d, i, c, r, s, m) {
  let u = document.getElementById('edit-text-quad-box')
  a
    ? ($('#bold-icon-btn-quad').val('clicked'),
      $('#bold-icon-btn-quad')
        .children('img')
        .attr('src', 'images/bold-blue.svg'),
      $('#bold-icon-btn-quad').addClass('textStyleSelected'))
    : ($('#bold-icon-btn-quad').val(''),
      $('#bold-icon-btn-quad').children('img').attr('src', 'images/bold.svg'),
      $('#bold-icon-btn-quad').removeClass('textStyleSelected')),
    d
      ? ($('#italic-icon-btn-quad').val('clicked'),
        $('#italic-icon-btn-quad')
          .children('img')
          .attr('src', 'images/italic-blue.svg'),
        $('#italic-icon-btn-quad').addClass('textStyleSelected'))
      : ($('#italic-icon-btn-quad').val(''),
        $('#italic-icon-btn-quad')
          .children('img')
          .attr('src', 'images/italic.svg'),
        $('#italic-icon-btn-quad').removeClass('textStyleSelected')),
    i
      ? ($('#text-trans-icon-btn-quad').val('clicked'),
        $('#text-trans-icon-btn-quad')
          .children('img')
          .attr('src', 'images/tt-blue.svg'),
        $('#text-trans-icon-btn-quad').addClass('textStyleSelected'))
      : ($('#text-trans-icon-btn-quad').val(''),
        $('#text-trans-icon-btn-quad')
          .children('img')
          .attr('src', 'images/textTransform.svg'),
        $('#text-trans-icon-btn-quad').removeClass('textStyleSelected')),
    c
      ? ($('#invert-icon-btn-quad').val('clicked'),
        $('#invert-icon-btn-quad')
          .children('img')
          .attr('src', 'images/invert-blue.svg'),
        $('#invert-icon-btn-quad').addClass('textStyleSelected'))
      : ($('#invert-icon-btn-quad').val(''),
        $('#invert-icon-btn-quad')
          .children('img')
          .attr('src', 'images/invert.svg'),
        $('#invert-icon-btn-quad').removeClass('textStyleSelected')),
    r
      ? ($('#whiten-icon-btn-quad').val('clicked'),
        $('#whiten-icon-btn-quad')
          .children('img')
          .attr('src', 'images/text-whiten-blue.svg'),
        $('#whiten-icon-btn-quad').addClass('textStyleSelected'))
      : ($('#whiten-icon-btn-quad').val(''),
        $('#whiten-icon-btn-quad')
          .children('img')
          .attr('src', 'images/text-whiten.svg'),
        $('#whiten-icon-btn-quad').removeClass('textStyleSelected'))
  let y = u.cloneNode(!0)
  ;(y.id = shapeClone + '_editQuadText'),
    null != s &&
      '' != s &&
      null != s &&
      ((y.querySelector(
        '#quadTextInput :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1)'
      ).value = e),
      (y.querySelector(
        '#quadTextInput :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1)'
      ).value = e),
      (y.querySelector(
        '#quadTextInput1 :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1)'
      ).value = t),
      (y.querySelector(
        '#quadTextInput1 :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1)'
      ).value = t),
      (y.querySelector(
        '#quadTextInput2 :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1)'
      ).value = l),
      (y.querySelector(
        '#quadTextInput2 :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1)'
      ).value = l),
      (y.querySelector(
        '#quadTextInput3 :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1)'
      ).value = n),
      (y.querySelector(
        '#quadTextInput3 :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1)'
      ).value = n),
      (y.querySelector('#quadFontSelect :nth-child(1) :nth-child(1)').value =
        o),
      (y.querySelector('#quadFontSelect :nth-child(1) :nth-child(1)').value =
        o),
      (y.querySelector('#textQuadFontSize :nth-child(1) :nth-child(1)').value =
        s),
      (y.querySelector('#textQuadFontSize :nth-child(1) :nth-child(2)').value =
        s),
      (y.querySelector(
        '#textQuadRadius :nth-child(2) :nth-child(1) :nth-child(1) :nth-child(1)'
      ).value = m),
      (y.querySelector(
        '#textQuadRadius :nth-child(2) :nth-child(1) :nth-child(1) :nth-child(2)'
      ).value = m)),
    (y.querySelector(
      '#quadTextInput :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1)'
    ).id = shapeClone + 'quadText'),
    (y.querySelector(
      '#quadTextInput1 :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1)'
    ).id = shapeClone + 'quadText1'),
    (y.querySelector(
      '#quadTextInput2 :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1)'
    ).id = shapeClone + 'quadText2'),
    (y.querySelector(
      '#quadTextInput3 :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1) :nth-child(1)'
    ).id = shapeClone + 'quadText3'),
    (y.querySelector('#quadFontSelect :nth-child(1) :nth-child(1)').id =
      shapeClone + 'quadTextFontSelect'),
    (y.querySelector('#textQuadFontSize :nth-child(1) :nth-child(2)').id =
      shapeClone + 'quadTextFontSize'),
    (y.querySelector('#textQuadRadius :nth-child(2) :nth-child(2)').id =
      shapeClone + 'quadTextRadius'),
    (y.querySelector('#bold-icon-btn-quad').title = 'Bold'),
    (y.querySelector('#italic-icon-btn-quad').title = 'Italic'),
    (y.querySelector('#text-trans-icon-btn-quad').title = 'Uppercase'),
    (y.querySelector('#invert-icon-btn-quad').title = 'Invert'),
    (y.querySelector('#whiten-icon-btn-quad').title = 'Whiten'),
    (y.querySelector('#bold-icon-btn-quad').id = shapeClone + '_quadTextBold'),
    (y.querySelector('#italic-icon-btn-quad').id =
      shapeClone + '_quadTextItalic'),
    (y.querySelector('#text-trans-icon-btn-quad').id =
      shapeClone + '_quadTextTransform'),
    (y.querySelector('#invert-icon-btn-quad').id =
      shapeClone + '_quadTextInvert'),
    (y.querySelector('#whiten-icon-btn-quad').id =
      shapeClone + '_quadTextWhiten'),
    (document.getElementById('edit-text-quad-box').style.display = 'none'),
    (y.style.display = 'block')
  for (
    let e = 10;
    e < document.getElementById('editGroup').children.length;
    e++
  )
    document
      .getElementById('editGroup')
      .children[e].classList.add('hasNoControl')
  document.getElementById('editGroup').appendChild(y),
    (document.getElementById('edit-text-around-box').style.display = 'none'),
    (document.getElementById('edit-text-center-box').style.display = 'none'),
    (document.getElementById('edit-layers-box').style.display = 'block'),
    (document.getElementById('fill_span').style.color = '#009EF8'),
    (document.getElementById('fadeSpan').style.color = '#009EF8'),
    (document.getElementById('docViewText').style.color = '#009EF8'),
    (document.getElementById('docView').style.pointerEvents = 'auto'),
    (document.getElementById('fill-icon').style.filter = 'none'),
    (document.getElementById('start-box').style.display = 'none'),
    (document.getElementById('edit-image-box').style.display = 'none'),
    (document.getElementById('edit-shape-box').style.display = 'none'),
    (document.getElementById('edit-text-top-box').style.display = 'none'),
    (document.getElementById('edit-text-rect-box').style.display = 'none'),
    (document.getElementById('resetText').style.color = '#009EF8'),
    (document.getElementById('resetIcon').style.filter = ''),
    (document.getElementById('resetIcon').style.opacity = ''),
    (document.getElementById('deleteText').style.color = '#009EF8'),
    (document.getElementById('deleteIcon').style.filter = ''),
    (document.getElementById('deleteIcon').style.opacity = ''),
    (document.getElementById('resetField').style.pointerEvents = 'auto'),
    (document.getElementById('delete').style.pointerEvents = 'auto'),
    (document.getElementById('fade').style.pointerEvents = 'auto'),
    (document.getElementById('dwnBtnFree').style.pointerEvents = 'auto'),
    (quadTextFlag = !0),
    $(function () {
      $('[data-bs-toggle="tooltip"]').tooltip({
        trigger: 'hover',
      }),
        $('[data-bs-toggle="tooltip"]').on('click', function () {
          $(this).tooltip('hide')
        })
    })
}
function imgOnCanvasTemplate(e, t, l, n, o, a) {
  ;(imageNumLayerId = a
    ? e + '_' + shapeClone + '_uploadedImg'
    : e + '_' + shapeClone),
    imgOnCanvasTemplateCounter++,
    imgOnCanvasCounter++
  for (let e = holdImgFlag.length; e < imgOnCanvasTemplateCounter; e++)
    holdImgFlag[e] = imageNumLayerId
  let d = document.getElementById('edit-image-box').cloneNode(!0)
  ;(d.id = shapeClone + '_editImage'),
    null != t &&
      '' != t &&
      null != t &&
      ((d.querySelector('#imageSize :nth-child(2) :nth-child(1)').value = t),
      (d.querySelector('#imageSize :nth-child(2) :nth-child(2)').value = t),
      (d.querySelector('#imageHorizontal :nth-child(2) :nth-child(1)').value =
        l),
      (d.querySelector('#imageHorizontal :nth-child(2) :nth-child(2)').value =
        l),
      (d.querySelector('#imageVertical :nth-child(2) :nth-child(1)').value = n),
      (d.querySelector('#imageVertical :nth-child(2) :nth-child(2)').value = n),
      (d.querySelector('#imageRotation :nth-child(2) :nth-child(1)').value = o),
      (d.querySelector('#imageRotation :nth-child(2) :nth-child(2)').value =
        o)),
    (d.querySelector('#imageSize :nth-child(2) :nth-child(1)').id =
      shapeClone + 'imageSize'),
    (d.querySelector('#imageHorizontal :nth-child(2) :nth-child(1)').id =
      shapeClone + 'imageHP'),
    (d.querySelector('#imageVertical :nth-child(2) :nth-child(1)').id =
      shapeClone + 'imageVP'),
    (d.querySelector('#imageRotation :nth-child(2) :nth-child(1)').id =
      shapeClone + 'imageRotate'),
    (document.getElementById('edit-image-box').style.display = 'none'),
    (d.style.display = 'block')
  for (
    let e = 10;
    e < document.getElementById('editGroup').children.length;
    e++
  )
    document
      .getElementById('editGroup')
      .children[e].classList.add('hasNoControl')
  document.getElementById('editGroup').appendChild(d),
    (document.getElementById('start-box').style.display = 'none'),
    (document.getElementById('edit-text-around-box').style.display = 'none'),
    (document.getElementById('edit-text-center-box').style.display = 'none'),
    (document.getElementById('edit-text-bottom-box').style.display = 'none'),
    (document.getElementById('edit-text-top-box').style.display = 'none'),
    (document.getElementById('edit-text-rect-box').style.display = 'none'),
    (document.getElementById('edit-shape-box').style.display = 'none'),
    (document.getElementById('edit-layers-box').style.display = 'block'),
    (document.getElementById('fill_span').style.color = '#009EF8'),
    (document.getElementById('fadeSpan').style.color = '#009EF8'),
    (document.getElementById('docViewText').style.color = '#009EF8'),
    (document.getElementById('docView').style.pointerEvents = 'auto'),
    (document.getElementById('fill-icon').style.filter = 'none'),
    (document.getElementById('resetText').style.color = '#009EF8'),
    (document.getElementById('resetIcon').style.filter = ''),
    (document.getElementById('resetIcon').style.opacity = ''),
    (document.getElementById('deleteText').style.color = '#009EF8'),
    (document.getElementById('deleteIcon').style.filter = ''),
    (document.getElementById('deleteIcon').style.opacity = ''),
    (document.getElementById('resetField').style.pointerEvents = 'auto'),
    (document.getElementById('delete').style.pointerEvents = 'auto'),
    (document.getElementById('fade').style.pointerEvents = 'auto'),
    (document.getElementById('dwnBtnFree').style.pointerEvents = 'auto'),
    (drawImageFlag = !0)
}
function imgOnCanvas(e, t) {
  imgOnCanvasCounter++
  let l,
    n = document.getElementById('edit-image-box').cloneNode(!0)
  ;(n.id = shapeClone + '_editImage'),
    (l = '_uploadedImg' == t ? e + '_' + shapeClone + t : e + '_' + shapeClone),
    (n.querySelector('#imageSize :nth-child(2) :nth-child(2)').id =
      shapeClone + 'imageSize'),
    (n.querySelector('#imageHorizontal :nth-child(2) :nth-child(2)').id =
      shapeClone + 'imageHP'),
    (n.querySelector('#imageVertical :nth-child(2) :nth-child(2)').id =
      shapeClone + 'imageVP'),
    (n.querySelector('#imageRotation :nth-child(2) :nth-child(2)').id =
      shapeClone + 'imageRotate'),
    (document.getElementById('edit-image-box').style.display = 'none'),
    (n.style.display = 'block')
  for (
    let e = 10;
    e < document.getElementById('editGroup').children.length;
    e++
  )
    document
      .getElementById('editGroup')
      .children[e].classList.add('hasNoControl')
  document.getElementById('editGroup').appendChild(n),
    (document.getElementById('start-box').style.display = 'none'),
    (document.getElementById('edit-text-around-box').style.display = 'none'),
    (document.getElementById('edit-text-center-box').style.display = 'none'),
    (document.getElementById('edit-text-bottom-box').style.display = 'none'),
    (document.getElementById('edit-text-top-box').style.display = 'none'),
    (document.getElementById('edit-shape-box').style.display = 'none'),
    (document.getElementById('edit-layers-box').style.display = 'block'),
    (document.getElementById('fill_span').style.color = '#009EF8'),
    (document.getElementById('fadeSpan').style.color = '#009EF8'),
    (document.getElementById('docViewText').style.color = '#009EF8'),
    (document.getElementById('docView').style.pointerEvents = 'auto'),
    (document.getElementById('fill-icon').style.filter = 'none'),
    (document.getElementById('resetText').style.color = '#009EF8'),
    (document.getElementById('resetIcon').style.filter = ''),
    (document.getElementById('resetIcon').style.opacity = ''),
    (document.getElementById('deleteText').style.color = '#009EF8'),
    (document.getElementById('deleteIcon').style.filter = ''),
    (document.getElementById('deleteIcon').style.opacity = ''),
    (document.getElementById('resetField').style.pointerEvents = 'auto'),
    (document.getElementById('delete').style.pointerEvents = 'auto'),
    (document.getElementById('fade').style.pointerEvents = 'auto'),
    (document.getElementById('dwnBtnFree').style.pointerEvents = 'auto'),
    (drawImageFlag = !0)
  for (let e = holdImgFlag.length; e < imgOnCanvasCounter; e++)
    holdImgFlag[e] = l
}
function highlightLayer(e) {
  ;(highlightLayerFlag = !1), (highlightLayerId = e)
}
function removeHighlightLayer(e) {
  ;(highlightLayerFlag = !0), (highlightLayerId = e)
}
function getId(e, t) {
  ;(hasNoControlLayerId = e),
    (layerCategory = t),
    (toManipulate = e),
    (objSelectFlag = !0),
    (layerSelectFlag = !0),
    (circularTextLayerId =
      document.getElementById(e).children[0].children[1].children[1].children[0]
        .id),
    (centerTextLayerId =
      document.getElementById(e).children[0].children[1].children[1].children[0]
        .id),
    (bottomTextLayerId =
      document.getElementById(e).children[0].children[1].children[1].children[0]
        .id),
    (topTextLayerId =
      document.getElementById(e).children[0].children[1].children[1].children[0]
        .id),
    (rectTextLayerId =
      document.getElementById(e).children[0].children[1].children[1].children[0]
        .id),
    (ovalTextLayerId =
      document.getElementById(e).children[0].children[1].children[1].children[0]
        .id),
    (quadTextLayerId =
      document.getElementById(e).children[0].children[1].children[1].children[0]
        .id)
  for (
    let t = 10;
    t < document.getElementById('editGroup').children.length;
    t++
  ) {
    let l = document.getElementById('editGroup').children
    l[t].id != e + layerCategory
      ? (l[t].classList.add('hasNoControl'),
        '_range' == layerCategory &&
          document
            .getElementById('edit-shape-box')
            .classList.remove('hasNoControl'))
      : (l[t].classList.remove('hasNoControl'), (l[t].style.display = 'block'))
  }
}
function displayEditShapeBox() {
  document
    .getElementById('edit-shape-box')
    .classList.contains('hasNoControl') &&
    document.getElementById('edit-shape-box').classList.remove('hasNoControl')
}
function delElement() {
  if (objSelectFlag) {
    let e = toManipulate,
      t = canvasA.find(t => t.id == e),
      l = canvasA.findIndex(e => e === t),
      n = -1 === l ? void 0 : l
    isNaN(n) ||
      (canvasA.map(t => {
        t.id === e &&
          ('image' == canvasA[n].objName &&
            ((imageIndex = canvasA[n].imgNum), imageIndex),
          (canvasA[n].hideFlag = !1))
      }),
      canvasA.splice(n, 1),
      (objSelectFlag = !1),
      elementCount--,
      0 == canvasA.length &&
        ((rectFlag = !1),
        (circleFlag = !1),
        (squareFlag = !1),
        (triangleFlag = !1),
        (ovalFlag = !1),
        (quadFlag = !1),
        (pentagonFlag = !1),
        (hexagonFlag = !1),
        (starFlag = !1),
        (octagonFlag = !1),
        (hexagramFlag = !1),
        (nonagonFlag = !1),
        (lineFlag = !1),
        (twoSixFlag = !1),
        (cubeFlag = !1),
        $('body').removeClass('edit-layers-arrow-show'),
        $('body').removeClass('edit-layers-box-arrow'),
        (document.getElementById('add-shape-menu').style.display = 'none'),
        (document.getElementById('shapesBtn').style.background = '#FDFDFD'),
        (document.getElementById('add-text-menu').style.diÂsplay = 'none'),
        (document.getElementById('textBtn').style.background = '#FDFDFD'),
        (document.getElementById('add-template-menu').style.display = 'none'),
        (document.getElementById('tempsBtn').style.background = '#FDFDFD'),
        (document.getElementById('add-images-menu').style.display = 'none'),
        (document.getElementById('imagesBtn').style.background = '#FDFDFD')))
  } else document.getElementById('deleteN').style.display = 'block'
}
function delLayer() {
  if (
    ((document.getElementById('count-layer').textContent = layerCount - 1),
    layerSelectFlag)
  ) {
    let e = toManipulate,
      t = layerA.find(t => t?.id == e),
      l = layerA.findIndex(e => e === t)
    switch (t.objName) {
      case 'circularText':
        document
          .querySelector('#dwnBtnFree')
          .addEventListener('click', function () {
            document.getElementById('noText').style.display = 'none'
          }),
          showPricingAfterEnterText()
        break
      case 'centerText':
        document
          .querySelector('#dwnBtnFree')
          .addEventListener('click', function () {
            document.getElementById('noText').style.display = 'none'
          }),
          showPricingAfterEnterText()
        break
      case 'bottomText':
        document
          .querySelector('#dwnBtnFree')
          .addEventListener('click', function () {
            document.getElementById('noText').style.display = 'none'
          }),
          showPricingAfterEnterText()
        break
      case 'topText':
        document
          .querySelector('#dwnBtnFree')
          .addEventListener('click', function () {
            document.getElementById('noText').style.display = 'none'
          }),
          showPricingAfterEnterText()
        break
      case 'rectText':
        document
          .querySelector('#dwnBtnFree')
          .addEventListener('click', function () {
            document.getElementById('noText').style.display = 'none'
          }),
          showPricingAfterEnterText()
        break
      case 'quadText':
        document
          .querySelector('#dwnBtnFree')
          .addEventListener('click', function () {
            document.getElementById('noText').style.display = 'none'
          }),
          showPricingAfterEnterText()
        break
    }
    let n = -1 === l ? void 0 : l
    if (isNaN(n));
    else {
      let e = document.getElementById(toManipulate).previousSibling,
        t = document.getElementById(toManipulate)?.nextSibling,
        l = null != t.id && null != t ? t : null != e && null != e.id ? e : null
      null !== l && (l.classList.add('selected'), (objSelectFlag = !0)),
        layerA.splice(n, 1),
        document.getElementById(toManipulate).remove(),
        (toManipulate = l.id),
        0 !== layerCount && layerCount--
    }
  }
  canvasA.length > 0
    ? ((document.getElementById('deleteText').style.color = '#009EF8'),
      (document.getElementById('deleteIcon').style.filter = ''),
      (document.getElementById('deleteIcon').style.opacity = ''),
      (document.getElementById('delete').style.pointerEvents = 'auto'),
      (document.getElementById('dwnBtnFree').style.pointerEvents = 'auto'))
    : ((document.getElementById('edit-shape-box').style.display = 'none'),
      (document.getElementById('edit-text-around-box').style.display = 'none'),
      (document.getElementById('edit-text-center-box').style.display = 'none'),
      (document.getElementById('edit-text-bottom-box').style.display = 'none'),
      (document.getElementById('edit-text-top-box').style.display = 'none'),
      (document.getElementById('edit-text-rect-box').style.display = 'none'),
      (document.getElementById('edit-image-box').style.display = 'none'),
      (document.getElementById('edit-layers-box').style.display = 'none'),
      (document.getElementById('fill-icon').style.filter = 'grayscale(1)'),
      (document.getElementById('fill_span').style.color = '#B0BDCB'),
      (document.getElementById('fillBtn').style.pointerEvents = 'none'),
      (document.getElementById('fade-icon').style.filter = 'grayscale(1)'),
      (document.getElementById('fadeSpan').style.color = '#B0BDCB'),
      (document.getElementById('docViewText').style.color = '#B0BDCB'),
      (document.getElementById('fade').style.pointerEvents = 'none'),
      document.getElementById('undoIcon') &&
        (document.getElementById('undoIcon').src = 'images/undo.svg'),
      (document.getElementById('deleteText').style.color = '#B0BDCB'),
      (document.getElementById('deleteIcon').style.filter = 'grayscale(1)'),
      (document.getElementById('deleteIcon').style.opacity = '0.6'),
      (document.getElementById('delete').style.pointerEvents = 'none'),
      (document.getElementById('dwnBtnFree').style.pointerEvents = 'none'))
}
function delEditBox() {
  let e = document.getElementById(
      toManipulate + layerCategory
    )?.previousSibling,
    t = document.getElementById(toManipulate + layerCategory)?.nextSibling,
    l = e?.id,
    n = (l ? e : t)?.id
  document.getElementById(toManipulate + layerCategory).remove()
  let o = null != e.id && null != e ? e : null != t && null != t.id ? t : null
  null !== o && o.classList.remove('hasNoControl'),
    n && (layerCategory = '_' + n.split('_')[1])
}
function clearAllEditBox() {
  document.getElementById(toManipulate + layerCategory).remove()
}
const resetCanvas = document.getElementById('resetButton')
function getEyeId(e) {
  eye2Manipulate = 'objectNo' + e
  let t = canvasA.find(e => e.id == eye2Manipulate),
    l = canvasA.findIndex(e => e === t)
  canvasA[l].hideFlag = !!eyeFlag
}
function changeEye(e) {
  eyeFlag
    ? ((eyeFlag = !1),
      (document.getElementById(e).src = 'images/eye-close.svg'))
    : ((eyeFlag = !0), (document.getElementById(e).src = 'images/eye-open.svg'))
}
function loadFile(e) {
  $('.loader').show()
  var t = e.target.files,
    l = new FileReader()
  ;(l.onload = function (e) {
    $.ajax({
      url: addImage(e.target.result),
      success: function () {
        loadFromLocalStorage(),
          document.querySelector('body').classList.remove('imagesBtn'),
          $('.loader').hide(),
          window.innerWidth <= 800 && closeAddImages()
      },
      error: function () {},
    })
  }),
    l.readAsDataURL(t[0]),
    (document.getElementById('edit-image-box').style.display = 'block'),
    (document.getElementById('edit-text-around-box').style.display = 'none'),
    (document.getElementById('edit-text-center-box').style.display = 'none'),
    (document.getElementById('edit-text-bottom-box').style.display = 'none'),
    (document.getElementById('edit-text-top-box').style.display = 'none'),
    (document.getElementById('edit-text-rect-box').style.display = 'none'),
    (document.getElementById('edit-text-oval-box').style.display = 'none'),
    (document.getElementById('edit-shape-box').style.display = 'none')
}
function loadFromLocalStorage(e = !1, t = null) {
  lsImage = e ? t : JSON.parse(localStorage.getItem('stampImage'))
  let l = lsImage + 'LS='
  img.push(loadImage(lsImage)), (currentIndex = img.indexOf(l))
  let n = img.length - 1
  passImg2Layer(lsImage, '_uploadedImg', n, '', currentIndex)
}
function addImage(e) {
  localStorage.setItem('stampImage', JSON.stringify(e))
}
function deleteImages() {
  localStorage.removeItem('stampImage')
}
resetCanvas.addEventListener('click', () => {
  $.ajax({
    url: 'reset_the_canvas.php',
    complete: function () {
      window.location.href = 'app.php?reset=true'
    },
  }),
    delAllLayers(),
    clearAll(),
    closeResetNotif(),
    (document.getElementById('add-shape-menu').style.display = 'none'),
    (document.getElementById('add-template-menu').style.display = 'none'),
    (document.getElementById('add-images-menu').style.display = 'none'),
    (document.getElementById('add-text-menu').style.display = 'none'),
    (document.getElementById('edit-shape-box').style.display = 'none'),
    (document.getElementById('edit-text-around-box').style.display = 'none'),
    (document.getElementById('edit-text-center-box').style.display = 'none'),
    (document.getElementById('edit-text-bottom-box').style.display = 'none'),
    (document.getElementById('edit-text-top-box').style.display = 'none'),
    (document.getElementById('edit-text-rect-box').style.display = 'none'),
    (document.getElementById('edit-text-oval-box').style.display = 'none'),
    (document.getElementById('edit-image-box').style.display = 'none'),
    (document.getElementById('edit-layers-box').style.display = 'none')
  let e = document.getElementsByClassName('edit-text-bottom-box')
  for (let t = 0; t < e.length; t++) e[t].style.display = 'none'
  let t = document.getElementsByClassName('edit-text-center-box')
  for (let e = 0; e < t.length; e++) t[e].style.display = 'none'
  let l = document.getElementsByClassName('edit-text-around-box')
  for (let e = 0; e < l.length; e++) l[e].style.display = 'none'
  let n = document.getElementsByClassName('edit-text-top-box')
  for (let e = 0; e < n.length; e++) n[e].style.display = 'none'
  let o = document.getElementsByClassName('edit-text-rect-box')
  for (let e = 0; e < o.length; e++) o[e].style.display = 'none'
  let a = document.getElementsByClassName('edit-text-oval-box')
  for (let e = 0; e < a.length; e++) a[e].style.display = 'none'
  let d = document.getElementsByClassName('edit-text-quad-box')
  for (let e = 0; e < d.length; e++) d[e].style.display = 'none'
  ;(document.getElementById('fill-icon').style.filter = 'grayscale(1)'),
    (document.getElementById('fill_span').style.color = '#B0BDCB'),
    (document.getElementById('fillBtn').style.pointerEvents = 'none'),
    (document.getElementById('fade-icon').style.filter = 'grayscale(1)'),
    (document.getElementById('fadeSpan').style.color = '#B0BDCB'),
    (document.getElementById('docViewText').style.color = '#B0BDCB'),
    (document.getElementById('fade').style.pointerEvents = 'none'),
    (document.getElementById('fillBox').style.pointerEvents = 'none'),
    (document.getElementById('resetText').style.color = '#B0BDCB'),
    (document.getElementById('resetIcon').style.filter = 'grayscale(1)'),
    (document.getElementById('resetIcon').style.opacity = '0.6'),
    (document.getElementById('resetField').style.pointerEvents = 'none'),
    (document.getElementById('deleteText').style.color = '#B0BDCB'),
    (document.getElementById('deleteIcon').style.filter = 'grayscale(1)'),
    (document.getElementById('deleteIcon').style.opacity = '0.6'),
    (document.getElementById('delete').style.pointerEvents = 'none'),
    (document.getElementById('dwnBtnFree').style.pointerEvents = 'none')
  let i = document.getElementById('editGroup').children,
    c = []
  for (let e = 10, t = 0; e < i.length; e++, t++) c[t] = i[e].id
  c.map(e => document.getElementById(e).remove())
}),
  $('#image-upload').on('click touchstart', function () {
    $(this).val('')
  }),
  $(function () {
    $('#filterCategory li').click(function () {
      var e = $(this).data('value')
      $('#filterCategory li').removeClass('active'),
        $(this).addClass('active'),
        $('#portfolio li').hide(),
        $('#portfolio li').each(function () {
          ;($(this).hasClass(e) || 'all' == e) && $(this).show()
        })
    })
  }),
  $('#filterCategory li').click(function () {
    $('#dropdown-btn4imgs').text($(this).text())
  }),
  $('#temp-filter li').click(function () {
    $('#dropdown-btn4temps').text($(this).text())
  }),
  $(function () {
    $('#temp-filter li').click(function () {
      ;(templateCategory = $(this).html().toLowerCase()),
        $('#temp-filter li').removeClass('active'),
        $(this).addClass('active'),
        $('#temp-portfolio li').hide(),
        $('#temp-portfolio li').each(function () {
          shapeCategoryFlag
            ? $(this).hasClass(templateCategory) &&
              $(this).hasClass(shapeCategory) &&
              $(this).show()
            : $(this).hasClass(templateCategory) && $(this).show()
        })
    })
  }),
  $(function () {
    $('#filterIcons li').click(function (e) {
      ;(shapeCategoryFlag = 'allShapes' != e.target.id),
        (shapeCategory = $(this).attr('class').split(' ')[0]),
        $('#filterIcons li').removeClass('active'),
        $(this).addClass('active'),
        $('#temp-portfolio li').hide(),
        (templateCategory =
          void 0 === templateCategory ? 'all' : templateCategory),
        $('#temp-portfolio li').each(function () {
          $(this).hasClass(shapeCategory) &&
            $(this).hasClass(templateCategory) &&
            $(this).show()
        })
    })
  }),
  $(function () {
    $('#allShapes').click(function () {
      $('#temp-portfolio li').each(function () {
        $(this).hasClass(templateCategory) && $(this).show()
      })
    })
  })
var $li = $('#filterIcons li').click(function () {
    $li.removeClass('selected'), $(this).addClass('selected')
  }),
  shapesMenu = '#add-shape-menu'
$(document).on('keydown', function (e) {
  27 === e.keyCode &&
    ($('.add-tools').removeClass(
      'shapesBtn textBtn tempsBtn imagesBtn libraryBtn'
    ),
    $('.left-bar .btn').removeClass('active'),
    $(shapesMenu).hide(),
    (document.getElementById('shapesBtn').style.background = 'none'))
})
var textMenu = '#add-text-menu'
$(document).on('keydown', function (e) {
  27 === e.keyCode &&
    ($('.add-tools').removeClass(
      'shapesBtn textBtn tempsBtn imagesBtn libraryBtn'
    ),
    $('.left-bar .btn').removeClass('active'),
    $(textMenu).hide(),
    (document.getElementById('textBtn').style.background = 'none'))
})
var tempsMenu = '#add-template-menu'
$(document).on('keydown', function (e) {
  27 === e.keyCode &&
    ($('.add-tools').removeClass(
      'shapesBtn textBtn tempsBtn imagesBtn libraryBtn'
    ),
    $('.left-bar .btn').removeClass('active'),
    $(tempsMenu).hide(),
    (document.getElementById('tempsBtn').style.background = 'none'),
    (document.getElementById('tempsIcon').src = 'images/template.svg'))
})
var imagesMenu = '#add-images-menu'
$(document).on('keydown', function (e) {
  27 === e.keyCode &&
    ($('.add-tools').removeClass(
      'shapesBtn textBtn tempsBtn imagesBtn libraryBtn'
    ),
    $('.left-bar .btn').removeClass('active'),
    $(imagesMenu).hide(),
    (document.getElementById('imagesBtn').style.background = 'none'),
    (document.getElementById('imagesIcon').src = 'images/image.svg'))
})
var pricingPopup = '#pricing-modal'
$(document).on('keydown', function (e) {
  27 === e.keyCode &&
    ($('.add-tools').removeClass('shapesBtn textBtn tempsBtn imagesBtn'),
    $('.left-bar .btn').removeClass('active'),
    $(pricingPopup).hide())
})
var docviewModal = '#docview-modal'
function showDocView() {
  $('#docview-modal').modal('show'),
    (pngFile = canvas.elt.toDataURL('image/png')),
    $('#canvasImage').attr('src', pngFile)
}
function closeA4() {
  document.getElementById('docview-modal').style.display = 'none'
}
function delAllLayers() {
  let e = document.getElementById('edit-layers-box').children.length
  for (let t = 2; t < e; t++)
    document.getElementById('edit-layers-box').children[2].remove()
  layerA = []
}
function clearAll() {
  return (
    (rectFlag = !1),
    (circleFlag = !1),
    (squareFlag = !1),
    (triangleFlag = !1),
    (quadFlag = !1),
    (ovalFlag = !1),
    (lineFlag = !1),
    (pentagonFlag = !1),
    (hexagonFlag = !1),
    (starFlag = !1),
    (octagonFlag = !1),
    (hexagramFlag = !1),
    (nonagonFlag = !1),
    (twoSixFlag = !1),
    (cubeFlag = !1),
    (circularTextFlag = !1),
    (centerTextFlag = !1),
    (topTextFlag = !1),
    (bottomTextFlag = !1),
    (rectTextFlag = !1),
    (ovalTextFlag = !1),
    (quadTextFlag = !1),
    (drawImageFlag = !1),
    (rFrameCount = 0),
    (cFrameCount = 0),
    (sFrameCount = 0),
    (tFrameCount = 0),
    (pFrameCount = 0),
    (dFrameCount = 0),
    (ovalFrameCount = 0),
    (lineFrameCount = 0),
    (hFrameCount = 0),
    (starFrameCount = 0),
    (octagonFrameCount = 0),
    (hexagramFrameCount = 0),
    (nonagonFrameCount = 0),
    (twoSixFrameCount = 0),
    (textAroundFrameCount = 0),
    (texCenterFrameCount = 0),
    (texBottomFrameCount = 0),
    (textTopFrameCount = 0),
    (textRectFrameCount = 0),
    (textovalFrameCount = 0),
    (textQuadFrameCount = 0),
    (imgFrameCount = 0),
    (elementCount = -1),
    (objectCount = 0),
    (fsbcObj = {}),
    (fstcObj = {}),
    (fsiObj = {}),
    (fwcObj = {}),
    (fsblObj = {}),
    (fstlObj = {}),
    (fwlObj = {}),
    (fsilObj = {}),
    (fsbbObj = {}),
    (fstbObj = {}),
    (fsibObj = {}),
    (fswbObj = {}),
    (fsbtObj = {}),
    (fsttObj = {}),
    (fsitObj = {}),
    (fswtObj = {}),
    (fsbrObj = {}),
    (fstrObj = {}),
    (fsirObj = {}),
    (fswrObj = {}),
    (fsboObj = {}),
    (fstoObj = {}),
    (fsioObj = {}),
    (fwoObj = {}),
    (fsbqObj = {}),
    (fstqObj = {}),
    (fsiqObj = {}),
    (fwqObj = {}),
    (canvasA = []),
    !0
  )
}
function renderTemplate(e) {
  $('.loader').show(),
    window.innerWidth <= 800 && closeAddTemps(),
    (className = '.' + e),
    $('.shop-box-item').removeClass('active'),
    $(className).addClass('active'),
    (layerCount = 0),
    (eyeId = -1),
    (holdImgFlag = []),
    delAllLayers()
  let t = document.getElementById('editGroup').children,
    l = []
  for (let e = 10, n = 0; e < t.length; e++, n++) l[n] = t[e].id
  l.map(e => document.getElementById(e).remove()),
    clearAll() &&
      $.ajax({
        type: 'POST',
        url: 'getTemplate.php',
        data: {
          tempname: e,
        },
        dataType: 'json',
        success: function (e) {
          e.success && templateElemDraw(e.data), $('.loader').hide()
        },
        error: function (e) {
          $('.loader').hide()
        },
      }),
    (document.getElementById('add-template-menu').style.display = 'none'),
    (document.getElementById('tempsBtn').style.background = 'none')
}
function templateElemDraw(e) {
  fillElements(e.stampColor, !0),
    (document.getElementById('fill-icon').value = e.stampColor)
  for (let t = 0; t < e.objects.length; t++)
    switch (e.objects[t].name) {
      case 'rect':
        addRectLayer(e.objects[t]),
          addShape(
            'rect',
            e.objects[t].scale,
            e.objects[t].stroke,
            e.objects[t].lineBreak
          ),
          displayEditShapeBox(),
          (rectFlag = !0)
        break
      case 'circle':
        addCircleLayer(e.objects[t]),
          addShape(
            'circle',
            e.objects[t].scale,
            e.objects[t].stroke,
            e.objects[t].lineBreak
          ),
          displayEditShapeBox(),
          (circleFlag = !0)
        break
      case 'square':
        addSquareLayer(e.objects[t]),
          addShape(
            'square',
            e.objects[t].scale,
            e.objects[t].stroke,
            e.objects[t].lineBreak
          ),
          displayEditShapeBox(),
          (squareFlag = !0)
        break
      case 'triangle':
        addTriangleLayer(e.objects[t]),
          addShape(
            'triangle',
            e.objects[t].scale,
            e.objects[t].stroke,
            e.objects[t].lineBreak
          ),
          displayEditShapeBox(),
          (triangleFlag = !0)
        break
      case 'hexagram':
        addHexagramLayer(e.objects[t]),
          addShape(
            'hexagram',
            e.objects[t].scale,
            e.objects[t].stroke,
            e.objects[t].lineBreak
          ),
          displayEditShapeBox(),
          (hexagramFlag = !0)
        break
      case 'pentagon':
        addPentagonLayer(e.objects[t]),
          addShape(
            'pentagon',
            e.objects[t].scale,
            e.objects[t].stroke,
            e.objects[t].lineBreak
          ),
          displayEditShapeBox(),
          (pentagonFlag = !0)
        break
      case 'twoSix':
        addTwoSixLayer(e.objects[t]),
          addShape(
            'twoSix',
            e.objects[t].scale,
            e.objects[t].stroke,
            e.objects[t].lineBreak
          ),
          displayEditShapeBox(),
          (twoSixFlag = !0)
        break
      case 'hexagon':
        addHexagonLayer(e.objects[t]),
          addShape(
            'hexagon',
            e.objects[t].scale,
            e.objects[t].stroke,
            e.objects[t].lineBreak
          ),
          displayEditShapeBox(),
          (hexagonFlag = !0)
        break
      case 'star':
        addStarLayer(e.objects[t]),
          addShape(
            'star',
            e.objects[t].scale,
            e.objects[t].stroke,
            e.objects[t].lineBreak
          ),
          displayEditShapeBox(),
          (starFlag = !0)
        break
      case 'octagon':
        addOctagonLayer(e.objects[t]),
          addShape(
            'octagon',
            e.objects[t].scale,
            e.objects[t].stroke,
            e.objects[t].lineBreak
          ),
          displayEditShapeBox(),
          (octagonFlag = !0)
        break
      case 'nonagon':
        addNonagonLayer(e.objects[t]),
          addShape(
            'nonagon',
            e.objects[t].scale,
            e.objects[t].stroke,
            e.objects[t].lineBreak
          ),
          displayEditShapeBox(),
          (nonagonFlag = !0)
        break
      case 'quad':
        addQuadLayer(e.objects[t]),
          addShape(
            'quad',
            e.objects[t].scale,
            e.objects[t].stroke,
            e.objects[t].lineBreak
          ),
          displayEditShapeBox(),
          (quadFlag = !0)
        break
      case 'oval':
        addOvalLayer(e.objects[t]),
          addShape(
            'oval',
            e.objects[t].scale,
            e.objects[t].stroke,
            e.objects[t].lineBreak
          ),
          displayEditShapeBox(),
          (ovalFlag = !0)
        break
      case 'line':
        addLineLayer(e.objects[t]),
          addShape(
            'line',
            e.objects[t].scale,
            e.objects[t].stroke,
            e.objects[t].lineBreak,
            e.objects[t].hp,
            e.objects[t].vp,
            e.objects[t].rotation
          ),
          displayEditShapeBox(),
          (lineFlag = !0)
        break
      case 'cube':
        addCubeLayer(e.objects[t]),
          addShape(
            'cube',
            e.objects[t].scale,
            e.objects[t].stroke,
            e.objects[t].lineBreak
          ),
          displayEditShapeBox(),
          (cubeFlag = !0)
        break
      case 'circularText':
        e.objects[t].style.bold && e.objects[t].style.italic
          ? (fsbcObj[e.objects[t].id] = 'bold italic')
          : e.objects[t].style.bold
          ? (fsbcObj[e.objects[t].id] = 'bold')
          : e.objects[t].style.italic
          ? (fsbcObj[e.objects[t].id] = 'italic')
          : (fsbcObj[e.objects[t].id] = 'normal'),
          e.objects[t].style.capitalize &&
            (fstcObj[e.objects[t].id] = 'upperCase'),
          'invert' == e.objects[t].style.invert ||
          !0 === e.objects[t].style.invert
            ? (fsiObj[e.objects[t].id] = 'invert')
            : (fsiObj[e.objects[t].id] = 'normal'),
          e.objects[t].style.whiten && (fwcObj[e.objects[t].id] = 'whiten'),
          addCircularTextLayer(e.objects[t]),
          textAround(
            e.objects[t].textInput,
            e.objects[t].fontName,
            e.objects[t].style.bold,
            e.objects[t].style.italic,
            e.objects[t].style.capitalize,
            e.objects[t].style.invert,
            e.objects[t].style.whiten,
            e.objects[t].fontSize,
            e.objects[t].letterSpacing,
            e.objects[t].scale,
            e.objects[t].rotation
          ),
          (circularTextFlag = !0)
        break
      case 'centerText':
        e.objects[t].style.bold && e.objects[t].style.italic
          ? (fsblObj[e.objects[t].id] = 'bold italic')
          : e.objects[t].style.bold
          ? (fsblObj[e.objects[t].id] = 'bold')
          : e.objects[t].style.italic
          ? (fsblObj[e.objects[t].id] = 'italic')
          : (fsblObj[e.objects[t].id] = 'normal'),
          e.objects[t].style.capitalize &&
            (fstlObj[e.objects[t].id] = 'upperCase'),
          e.objects[t].style.invert
            ? (fsilObj[e.objects[t].id] = 'invert')
            : (fsilObj[e.objects[t].id] = 'normal'),
          e.objects[t].style.whiten && (fwlObj[e.objects[t].id] = 'whiten'),
          addCenterTextLayer(e.objects[t]),
          textCenter(
            e.objects[t].textInput,
            e.objects[t].fontName,
            e.objects[t].style.bold,
            e.objects[t].style.italic,
            e.objects[t].style.capitalize,
            e.objects[t].style.invert,
            e.objects[t].style.whiten,
            e.objects[t].fontSize,
            e.objects[t].hp,
            e.objects[t].vp,
            e.objects[t].rotation
          ),
          (centerTextFlag = !0)
        break
      case 'bottomText':
        e.objects[t].style.bold && e.objects[t].style.italic
          ? (fsbbObj[e.objects[t].id] = 'bold italic')
          : e.objects[t].style.bold
          ? (fsbbObj[e.objects[t].id] = 'bold')
          : e.objects[t].style.italic
          ? (fsbbObj[e.objects[t].id] = 'italic')
          : (fsbbObj[e.objects[t].id] = 'normal'),
          e.objects[t].style.capitalize &&
            (fstbObj[e.objects[t].id] = 'upperCase'),
          e.objects[t].style.invert
            ? (fsibObj[e.objects[t].id] = 'invert')
            : (fsibObj[e.objects[t].id] = 'normal'),
          e.objects[t].style.whiten && (fswbObj[e.objects[t].id] = 'whiten'),
          addBottomTextLayer(e.objects[t]),
          textBottom(
            e.objects[t].textInput,
            e.objects[t].textInput1,
            e.objects[t].textInput2,
            e.objects[t].textInput3,
            e.objects[t].fontName,
            e.objects[t].style.bold,
            e.objects[t].style.italic,
            e.objects[t].style.capitalize,
            e.objects[t].style.invert,
            e.objects[t].style.whiten,
            e.objects[t].fontSize,
            e.objects[t].margin
          ),
          (bottomTextFlag = !0)
        break
      case 'topText':
        e.objects[t].style.bold && e.objects[t].style.italic
          ? (fsbtObj[e.objects[t].id] = 'bold italic')
          : e.objects[t].style.bold
          ? (fsbtObj[e.objects[t].id] = 'bold')
          : e.objects[t].style.italic
          ? (fsbtObj[e.objects[t].id] = 'italic')
          : (fsbtObj[e.objects[t].id] = 'normal'),
          e.objects[t].style.capitalize &&
            (fsttObj[e.objects[t].id] = 'upperCase'),
          e.objects[t].style.invert
            ? (fsitObj[e.objects[t].id] = 'invert')
            : (fsitObj[e.objects[t].id] = 'normal'),
          e.objects[t].style.whiten && (fswtObj[e.objects[t].id] = 'whiten'),
          addTopTextLayer(e.objects[t]),
          textTop(
            e.objects[t].textInput,
            e.objects[t].textInput1,
            e.objects[t].textInput2,
            e.objects[t].fontName,
            e.objects[t].style.bold,
            e.objects[t].style.italic,
            e.objects[t].style.capitalize,
            e.objects[t].style.invert,
            e.objects[t].style.whiten,
            e.objects[t].fontSize,
            e.objects[t].margin
          ),
          (topTextFlag = !0)
        break
      case 'rectText':
        e.objects[t].style.bold && e.objects[t].style.italic
          ? (fsbrObj[e.objects[t].id] = 'bold italic')
          : e.objects[t].style.bold
          ? (fsbrObj[e.objects[t].id] = 'bold')
          : e.objects[t].style.italic
          ? (fsbrObj[e.objects[t].id] = 'italic')
          : (fsbrObj[e.objects[t].id] = 'normal'),
          e.objects[t].style.capitalize &&
            (fstrObj[e.objects[t].id] = 'upperCase'),
          e.objects[t].style.invert
            ? (fsirObj[e.objects[t].id] = 'invert')
            : (fsirObj[e.objects[t].id] = 'normal'),
          e.objects[t].style.whiten && (fswrObj[e.objects[t].id] = 'whiten'),
          addRectTextLayer(e.objects[t]),
          textRect(
            e.objects[t].textInput,
            e.objects[t].textInput1,
            e.objects[t].textInput2,
            e.objects[t].textInput3,
            e.objects[t].fontName,
            e.objects[t].style.bold,
            e.objects[t].style.italic,
            e.objects[t].style.capitalize,
            e.objects[t].style.invert,
            e.objects[t].style.whiten,
            e.objects[t].fontSize,
            e.objects[t].margin
          ),
          (rectTextFlag = !0)
        break
      case 'ovalText':
        e.objects[t].style.bold && e.objects[t].style.italic
          ? (fsboObj[e.objects[t].id] = 'bold italic')
          : e.objects[t].style.bold
          ? (fsboObj[e.objects[t].id] = 'bold')
          : e.objects[t].style.italic
          ? (fsboObj[e.objects[t].id] = 'italic')
          : (fsboObj[e.objects[t].id] = 'normal'),
          e.objects[t].style.capitalize &&
            (fstoObj[e.objects[t].id] = 'upperCase'),
          e.objects[t].style.invert
            ? (fsioObj[e.objects[t].id] = 'invert')
            : (fsioObj[e.objects[t].id] = 'normal'),
          e.objects[t].style.whiten && (fwoObj[e.objects[t].id] = 'whiten'),
          addOvalTextLayer(e.objects[t]),
          textOval(
            e.objects[t].textInput,
            e.objects[t].fontName,
            e.objects[t].style.bold,
            e.objects[t].style.italic,
            e.objects[t].style.capitalize,
            e.objects[t].style.invert,
            e.objects[t].style.whiten,
            e.objects[t].fontSize,
            e.objects[t].letterSpacing,
            e.objects[t].scale,
            e.objects[t].rotation
          ),
          (ovalTextFlag = !0)
        break
      case 'quadText':
        e.objects[t].style.bold && e.objects[t].style.italic
          ? (fsbqObj[e.objects[t].id] = 'bold italic')
          : e.objects[t].style.bold
          ? (fsbqObj[e.objects[t].id] = 'bold')
          : e.objects[t].style.italic
          ? (fsbqObj[e.objects[t].id] = 'italic')
          : (fsbqObj[e.objects[t].id] = 'normal'),
          e.objects[t].style.capitalize &&
            (fstqObj[e.objects[t].id] = 'upperCase'),
          e.objects[t].style.invert
            ? (fsiqObj[e.objects[t].id] = 'invert')
            : (fsiqObj[e.objects[t].id] = 'normal'),
          e.objects[t].style.whiten && (fwqObj[e.objects[t].id] = 'whiten'),
          addQuadTextLayer(e.objects[t]),
          textQuad(
            e.objects[t].textInput,
            e.objects[t].textInput1,
            e.objects[t].textInput2,
            e.objects[t].textInput3,
            e.objects[t].fontName,
            e.objects[t].style.bold,
            e.objects[t].style.italic,
            e.objects[t].style.capitalize,
            e.objects[t].style.invert,
            e.objects[t].style.whiten,
            e.objects[t].fontSize,
            e.objects[t].margin
          ),
          (quadTextFlag = !0)
        break
      case 'image':
        e.objects[t].isUploaded && loadFromLocalStorage(!0, e.objects[t].src),
          passImg2Layer(
            e.objects[t].src,
            null,
            null,
            e.objects[t],
            e.objects[t].imgNum
          ),
          (img[e.objects[t].imgNum] = loadImage(e.objects[t].src)),
          imgOnCanvasTemplate(
            e.objects[t].imgNum,
            e.objects[t].size,
            e.objects[t].hp,
            e.objects[t].vp,
            e.objects[t].rotation,
            e.objects[t].isUploaded
          ),
          (drawImageFlag = !0)
        break
    }
}
function editHideMobile() {
  $('body').toggleClass('edit-layer-toogleclass')
}
function viewEditBox() {
  $(window).width() < 760 &&
    ($('.add-tools').removeClass('shapesBtn textBtn tempsBtn imagesBtn'),
    $('body').removeClass('shapesBtn textBtn tempsBtn imagesBtn'))
}
function collectData(e, t) {
  stampColor = 0 === color ? '#1b49ac' : color
  let l = $('.edit-shape-box').get()
  ;(l = l.filter(e => 'edit-shape-box' != e.id)),
    (l = l.map(e => e.children[2].children[0]))
  let n = l.map(e => e.children),
    o = [],
    a = n.map(e => [...e]).map(e => e.map(e => e.children[1]))
  ;(a = a.map(e => e.filter(e => void 0 !== e))),
    (a = a.map(e =>
      e.map(e => {
        if (e[1].id.includes('object'))
          return [[...e][1].value, e[1].id.split(/(\d+)/)[1]]
      })
    )),
    (a = a.map(e => e.filter(e => void 0 !== e))),
    a.forEach(e => {
      let t = {}
      if (3 === e.length) {
        t.id = 'objectNo' + e[0][1]
        let l = canvasA.find(e => e.id == t.id)
        ;(t.name = l.objName),
          (t.scale = e[0][0]),
          (t.stroke = e[1][0]),
          (t.lineBreak = e[2][0])
      } else
        6 === e.length &&
          ((t.id = 'objectNo' + e[0][1]),
          (t.name = 'line'),
          (t.scale = e[0][0]),
          (t.stroke = e[1][0]),
          (t.lineBreak = e[2][0]),
          (t.hp = e[3][0]),
          (t.vp = e[4][0]),
          (t.rotation = e[5][0]))
      o.push(t)
    })
  let d = $('.edit-text-around-box').get()
  d = d.filter(e => 'edit-text-around-box' != e.id)
  let i = d
    .map(
      e =>
        e.children[3].children[0].children[0].children[0].children[0]
          .children[0].id
    )
    .map(e => 'objectNo' + e.split(/(\d+)/)[1])
  circleArr = i.map(e => {
    let t = e + 'circleText',
      l = e + 'circularTextFontSelect',
      n = e + '_circularTextBold',
      a = e + '_circularTextItalic',
      d = e + '_circularTextTransform',
      i = e + '_circularTextWhiten',
      c = e + 'circularTextFontSize',
      r = e + 'circularTextSpacing',
      s = e + 'circularTextRadius',
      m = e + 'circularTextRotation',
      u = {
        style: {},
      }
    ;(u.id = e),
      (u.name = 'circularText'),
      (u.textInput = $('#' + t).val()),
      (u.fontName = $('#' + l).val()),
      (u.style.bold = $('#' + n).hasClass('textStyleSelected')),
      (u.style.italic = $('#' + a).hasClass('textStyleSelected')),
      (u.style.capitalize = $('#' + d).hasClass('textStyleSelected')),
      (u.style.invert = fsiObj[e]),
      (u.style.whiten = $('#' + i).hasClass('textStyleSelected')),
      (u.fontSize = $('#' + c).val()),
      (u.letterSpacing = $('#' + r).val()),
      (u.scale = $('#' + s).val()),
      (u.rotation = $('#' + m).val()),
      o.push(u)
  })
  let c = $('.edit-text-center-box').get()
  c = c.filter(e => 'edit-text-center-box' != e.id)
  let r = c
    .map(
      e =>
        e.children[3].children[0].children[0].children[0].children[0]
          .children[0].id
    )
    .map(e => 'objectNo' + e.split(/(\d+)/)[1])
  lineArr = r.map(e => {
    let t = e + 'centerText',
      l = e + 'centerTextFontSelect',
      n = e + '_centerTextBold',
      a = e + '_centerTextItalic',
      d = e + '_centerTextTransform',
      i = e + '_centerTextInvert',
      c = e + '_centerTextWhiten',
      r = e + 'centerTextFontSize',
      s = e + 'centerTextHorizontal',
      m = e + 'centerTextVertical',
      u = e + 'centerTextRotation',
      y = {
        style: {},
      }
    ;(y.id = e),
      (y.name = 'centerText'),
      (y.textInput = $('#' + t).val()),
      (y.fontName = $('#' + l).val()),
      (y.style.bold = $('#' + n).hasClass('textStyleSelected')),
      (y.style.italic = $('#' + a).hasClass('textStyleSelected')),
      (y.style.capitalize = $('#' + d).hasClass('textStyleSelected')),
      (y.style.invert = $('#' + i).hasClass('textStyleSelected')),
      (y.style.whiten = $('#' + c).hasClass('textStyleSelected')),
      (y.fontSize = $('#' + r).val()),
      (y.hp = $('#' + s).val()),
      (y.vp = $('#' + m).val()),
      (y.rotation = $('#' + u).val()),
      o.push(y)
  })
  let s = $('.edit-text-bottom-box').get()
  s = s.filter(e => 'edit-text-bottom-box' != e.id)
  let m = s
    .map(
      e =>
        e.children[3].children[0].children[0].children[0].children[0]
          .children[0].id
    )
    .map(e => 'objectNo' + e.split(/(\d+)/)[1])
  bottomArr = m.map(e => {
    let t = e + 'bottomText',
      l = e + 'bottomText1',
      n = e + 'bottomText2',
      a = e + 'bottomText3',
      d = e + 'bottomTextFontSelect',
      i = e + '_bottomTextBold',
      c = e + '_bottomTextItalic',
      r = e + '_bottomTextTransform',
      s = e + '_bottomTextInvert',
      m = e + '_bottomTextWhiten',
      u = e + 'bottomTextFontSize',
      y = e + 'bottomTextRadius',
      g = {
        style: {},
      }
    ;(g.id = e),
      (g.name = 'bottomText'),
      (g.textInput = $('#' + t).val()),
      (g.textInput1 = $('#' + l).val()),
      (g.textInput2 = $('#' + n).val()),
      (g.textInput3 = $('#' + a).val()),
      (g.fontName = $('#' + d).val()),
      (g.style.bold = $('#' + i).hasClass('textStyleSelected')),
      (g.style.italic = $('#' + c).hasClass('textStyleSelected')),
      (g.style.capitalize = $('#' + r).hasClass('textStyleSelected')),
      (g.style.invert = $('#' + s).hasClass('textStyleSelected')),
      (g.style.whiten = $('#' + m).hasClass('textStyleSelected')),
      (g.fontSize = $('#' + u).val()),
      (g.radius = $('#' + y).val()),
      o.push(g)
  })
  let u = $('.edit-text-top-box').get()
  u = u.filter(e => 'edit-text-top-box' != e.id)
  let y = u
    .map(
      e =>
        e.children[3].children[0].children[0].children[0].children[0]
          .children[0].id
    )
    .map(e => 'objectNo' + e.split(/(\d+)/)[1])
  topArr = y.map(e => {
    let t = e + 'topText',
      l = e + 'topText1',
      n = e + 'topText2',
      a = e + 'topTextFontSelect',
      d = e + '_topTextBold',
      i = e + '_topTextItalic',
      c = e + '_topTextTransform',
      r = e + '_topTextInvert',
      s = e + '_topTextWhiten',
      m = e + 'topTextFontSize',
      u = e + 'topTextRadius',
      y = {
        style: {},
      }
    ;(y.id = e),
      (y.name = 'topText'),
      (y.textInput = $('#' + t).val()),
      (y.textInput1 = $('#' + l).val()),
      (y.textInput2 = $('#' + n).val()),
      (y.fontName = $('#' + a).val()),
      (y.style.bold = $('#' + d).hasClass('textStyleSelected')),
      (y.style.italic = $('#' + i).hasClass('textStyleSelected')),
      (y.style.capitalize = $('#' + c).hasClass('textStyleSelected')),
      (y.style.invert = $('#' + r).hasClass('textStyleSelected')),
      (y.style.whiten = $('#' + s).hasClass('textStyleSelected')),
      (y.fontSize = $('#' + m).val()),
      (y.margin = $('#' + u).val()),
      o.push(y)
  })
  let g = $('.edit-text-rect-box').get()
  g = g.filter(e => 'edit-text-rect-box' != e.id)
  let h = g
    .map(
      e =>
        e.children[3].children[0].children[0].children[0].children[0]
          .children[0].id
    )
    .map(e => 'objectNo' + e.split(/(\d+)/)[1])
  rectArr = h.map(e => {
    let t = e + 'rectText',
      l = e + 'rectText1',
      n = e + 'rectText2',
      a = e + 'rectText3',
      d = e + 'rectTextFontSelect',
      i = e + '_rectTextBold',
      c = e + '_rectTextItalic',
      r = e + '_rectTextTransform',
      s = e + '_rectTextInvert',
      m = e + '_rectTextWhiten',
      u = e + 'rectTextFontSize',
      y = e + 'rectTextRadius',
      g = {
        style: {},
      }
    ;(g.id = e),
      (g.name = 'rectText'),
      (g.textInput = $('#' + t).val()),
      (g.textInput1 = $('#' + l).val()),
      (g.textInput2 = $('#' + n).val()),
      (g.textInput3 = $('#' + a).val()),
      (g.fontName = $('#' + d).val()),
      (g.style.bold = $('#' + i).hasClass('textStyleSelected')),
      (g.style.italic = $('#' + c).hasClass('textStyleSelected')),
      (g.style.capitalize = $('#' + r).hasClass('textStyleSelected')),
      (g.style.invert = $('#' + s).hasClass('textStyleSelected')),
      (g.style.whiten = $('#' + m).hasClass('textStyleSelected')),
      (g.fontSize = $('#' + u).val()),
      (g.margin = $('#' + y).val()),
      o.push(g)
  })
  let b = $('.edit-text-quad-box').get()
  b = b.filter(e => 'edit-text-quad-box' != e.id)
  let p = b
    .map(
      e =>
        e.children[3].children[0].children[0].children[0].children[0]
          .children[0].id
    )
    .map(e => 'objectNo' + e.split(/(\d+)/)[1])
  quadArr = p.map(e => {
    let t = e + 'quadText',
      l = e + 'quadText1',
      n = e + 'quadText2',
      a = e + 'quadText3',
      d = e + 'quadTextFontSelect',
      i = e + '_quadTextBold',
      c = e + '_quadTextItalic',
      r = e + '_quadTextTransform',
      s = e + '_quadTextInvert',
      m = e + '_quadTextWhiten',
      u = e + 'quadTextFontSize',
      y = e + 'quadTextRadius',
      g = {
        style: {},
      }
    ;(g.id = e),
      (g.name = 'quadText'),
      (g.textInput = $('#' + t).val()),
      (g.textInput1 = $('#' + l).val()),
      (g.textInput2 = $('#' + n).val()),
      (g.textInput3 = $('#' + a).val()),
      (g.fontName = $('#' + d).val()),
      (g.style.bold = $('#' + i).hasClass('textStyleSelected')),
      (g.style.italic = $('#' + c).hasClass('textStyleSelected')),
      (g.style.capitalize = $('#' + r).hasClass('textStyleSelected')),
      (g.style.invert = $('#' + s).hasClass('textStyleSelected')),
      (g.style.whiten = $('#' + m).hasClass('textStyleSelected')),
      (g.fontSize = $('#' + u).val()),
      (g.margin = $('#' + y).val()),
      o.push(g)
  })
  let x = $('.edit-text-oval-box').get()
  x = x.filter(e => 'edit-text-oval-box' != e.id)
  let v = x
    .map(
      e =>
        e.children[3].children[0].children[0].children[0].children[0]
          .children[0].id
    )
    .map(e => 'objectNo' + e.split(/(\d+)/)[1])
  ovalArr = v.map(e => {
    let t = e + 'ovalText',
      l = e + 'ovalTextFontSelect',
      n = e + '_ovalTextBold',
      a = e + '_ovalTextItalic',
      d = e + '_ovalTextTransform',
      i = e + '_ovalTextInvert',
      c = e + '_ovalTextWhiten',
      r = e + 'ovalTextFontSize',
      s = e + 'ovalTextSpacing',
      m = e + 'ovalTextRadius',
      u = e + 'ovalTextRotation',
      y = {
        style: {},
      }
    ;(y.id = e),
      (y.name = 'ovalText'),
      (y.textInput = $('#' + t).val()),
      (y.fontName = $('#' + l).val()),
      (y.style.bold = $('#' + n).hasClass('textStyleSelected')),
      (y.style.italic = $('#' + a).hasClass('textStyleSelected')),
      (y.style.capitalize = $('#' + d).hasClass('textStyleSelected')),
      (y.style.invert = $('#' + i).hasClass('textStyleSelected')),
      (y.style.whiten = $('#' + c).hasClass('textStyleSelected')),
      (y.fontSize = $('#' + r).val()),
      (y.letterSpacing = $('#' + s).val()),
      (y.scale = $('#' + m).val()),
      (y.rotation = $('#' + u).val()),
      o.push(y)
  })
  let I = $('.edit-image-box').get()
  ;(I = I.filter(e => 'edit-image-box' != e.id)),
    I.map(e => e.id.split('_')[0]).map(e => {
      let t = e + 'imageSize',
        l = e + 'imageHP',
        n = e + 'imageVP',
        a = e + 'imageRotate',
        d = {}
      d.id = e
      let i = canvasA.find(e => e.id == d.id)
      ;(d.isUploaded = !!i.imgSrc.startsWith('data')),
        (d.name = 'image'),
        (d.src = i.imgSrc),
        (d.imgNum = i.imgNum),
        (d.size = $('#' + t).val()),
        (d.hp = $('#' + l).val()),
        (d.vp = $('#' + n).val()),
        (d.rotation = $('#' + a).val()),
        o.push(d)
    })
  let E = {
    stampColor: stampColor,
    objects: o,
    sessionKey: e,
  }
  $.ajax({
    type: 'POST',
    url: 'downloads.php',
    data: {
      json: JSON.stringify(E),
    },
    dataType: 'json',
    success: function (e) {},
    error: function (e) {},
  })
}
$(document).on('keydown', function (e) {
  27 === e.keyCode &&
    ($('.add-tools').removeClass('shapesBtn textBtn tempsBtn imagesBtn'),
    $('.left-bar .btn').removeClass('active'),
    $(docviewModal).hide())
}),
  $.ajax({
    url: 'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyDiSvJ6WuOCXGJrvdDb4zyBpdhYoObdfko',
    success: function (e) {},
  }),
  $('.edit-layer-view-mob').click(function () {
    $('body').toggleClass('edit-layers-box-arrow')
  }),
  $('.shop-box-item').click(function () {
    $('body').addClass('edit-layers-arrow-show'),
      $(window).width() < 760 &&
        ($('body').removeClass('shapesBtn textBtn tempsBtn imagesBtn'),
        $('.add-tools').removeClass('shapesBtn textBtn tempsBtn imagesBtn'))
  }),
  $('.edit-layers-box .row.allLayers').click(function () {}),
  0 !== window.jsonData
    ? (0 != window.jsonData.objects.length ||
        canvasReset ||
        (window.jsonData = defaultJsonObject),
      $(document).ready(function () {
        ;(document.querySelector('.loader').style.display = 'flex'),
          setTimeout(() => {
            setup(),
              templateElemDraw(window.jsonData),
              $('body').addClass('edit-layers-arrow-show'),
              $('.loader').hide()
          }, 2500)
      }))
    : canvasReset ||
      $(document).ready(function () {
        ;(document.querySelector('.loader').style.display = 'flex'),
          setTimeout(() => {
            setup(),
              templateElemDraw(defaultJsonObject),
              $('body').addClass('edit-layers-arrow-show'),
              $('.loader').hide()
          }, 2500)
      })
let ss = 1
function Once(e, t, l) {
  ss++
}
$('#language_open').click(function () {
  $('.fixed_side1').addClass('fixed_side1_'),
    $('.language_popup').addClass('language_popup_'),
    $('body').addClass('scroll_stop')
}),
  $('.col5_close').click(function () {
    $('.fixed_side1').removeClass('fixed_side1_'),
      $('.language_popup').removeClass('language_popup_'),
      $('body').removeClass('scroll_stop')
  }),
  $('.close').click(function () {
    $('.alert').css('display', 'none')
  }),
  $('#feature_open').click(function () {
    $('.fixed_side1').addClass('fixed_side1_'),
      $('.requestfeature_popup').addClass('requestfeature_popup_'),
      $('body').addClass('scroll_stop')
  }),
  $('.col5_close').click(function () {
    $('.fixed_side1').removeClass('fixed_side1_'),
      $('.requestfeature_popup').removeClass('requestfeature_popup_'),
      $('body').removeClass('scroll_stop')
  }),
  $('.close').click(function () {
    $('.alert').css('display', 'none')
  }),
  $('#feedback_open').click(function () {
    $('.fixed_side1').addClass('fixed_side1_'),
      $('.feedback_popup').addClass('feedback_popup_'),
      $('body').addClass('scroll_stop')
  }),
  $('.col5_close').click(function () {
    $('.fixed_side1').removeClass('fixed_side1_'),
      $('.feedback_popup').removeClass('feedback_popup_'),
      $('body').removeClass('scroll_stop')
  }),
  $('.close').click(function () {
    $('.alert').css('display', 'none')
  })
const popup = document.getElementById('popup')
function closePopup() {
  $('.fixed_side1').removeClass('fixed_side1_'),
    $('.fixed_side2').removeClass('fixed_side2_'),
    $('.pricing_popup').removeClass('pricing_popup_'),
    $('.requestfeature_popup').removeClass('requestfeature_popup_'),
    $('.feedback_popup').removeClass('feedback_popup_'),
    $('.email_popup').removeClass('email_popup_'),
    $('.language_popup').removeClass('language_popup_'),
    $('body').removeClass('scroll_stop')
}
function pay() {
  $('.receipt').slideUp('slow'), $('.paid').slideDown('slow')
}
function goBack() {
  var e = $('.email_popup')
  e.removeClass('email_popup_')
  var t = e.prev('.pricing_popup')
  t.length > 0 && t.addClass('pricing_popup_')
}
function convertFile() {
  $.ajax({
    type: 'POST',
    url: 'convert.php',
    data: {
      imgBase64: pngFile,
    },
  })
}
function checkFormValidation() {
  return (
    (emailValue = $('#sendEmail').val()),
    (nameoncard = $('#nameoncard').val()),
    '' == emailValue
      ? ($('.email_popup').removeClass('email_popup_'),
        $('.fixed_side1').removeClass('fixed_side1_'),
        Swal.fire({
          icon: 'error',
          title: 'Email address error',
          text: 'Please provide email address',
        }),
        !1)
      : '' == nameoncard
      ? ($('.email_popup').removeClass('email_popup_'),
        $('.fixed_side1').removeClass('fixed_side1_'),
        Swal.fire({
          icon: 'error',
          title: 'Name on card error',
          text: 'Please provide name on card',
        }),
        !1)
      : !(
          !isRZP &&
          document
            .querySelector('#card-element')
            .classList.contains('StripeElement--empty') &&
          ($('.email_popup').removeClass('email_popup_'),
          $('.fixed_side1').removeClass('fixed_side1_'),
          Swal.fire({
            icon: 'error',
            title: 'Card Issue',
            text: 'Please make sure that card details are entered correctly.',
          }),
          1)
        )
  )
}
function getComboA(e) {
  e.value
}
function replaceVersion(e) {
  var t = e.lastIndexOf('v2')
  return (
    -1 !== t && (e = e.substring(0, t) + 'v1' + e.substring(t + 'v2'.length)), e
  )
}
function saveSubscriptionStampDesign() {
  $('.loader').show(),
    (pngFile = canvas.elt.toDataURL('image/png')),
    collectData(getFormattedTimestamp()),
    $.ajax({
      type: 'POST',
      url: 'save_subscription_stamp.php',
      data: {
        image: pngFile,
      },
      dataType: 'json',
      success: function (e) {
        !0 === e.status && !0 === e.redirect
          ? (window.location.href = e.data.redirect_url)
          : !0 === e.status && !1 === e.redirect
          ? ($('.loader').hide(), $('#subscription_modal').modal('show'))
          : (Swal.fire({
              icon: 'error',
              title: 'Error',
              text: e.message,
            }),
            $('.loader').hide())
      },
    })
}
function containsHindi(e) {
  return /[\u0900-\u097F]/.test(e)
}
function containsUrdu(e) {
  return /[\u0600-\u06FF]/.test(e)
}
function containsArabic(e) {
  return /[\u0600-\u06FF]/.test(e)
}
document.addEventListener('keydown', function (e) {
  'Escape' === e.key && closePopup()
}),
  $('.open_email_popup').click(function () {}),
  $('.col5_close').click(function () {
    $('.fixed_side1').removeClass('fixed_side1_'),
      $('.email_popup').removeClass('email_popup_'),
      $('body').removeClass('scroll_stop')
  }),
  $('#goBack').click(goBack),
  $('#sendEmail').on('change', function () {
    $('#sendEmailLabel').text('Email'),
      $('#emailSendButton').prop('disabled', !1),
      $('#sendEmailLabel').removeClass('text-danger')
    var e = $(this).val()
    ;/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/.test(
      e
    ) ||
      ($('#sendEmailLabel').text('Enter a Valid Email'),
      $('#sendEmailLabel').addClass('text-danger'),
      $('#emailSendButton').prop('disabled', !0))
  }),
  (document.getElementById('canvas-wrapper').oncontextmenu = function () {
    return !1
  }),
  $('#dwnBtnFree').click(function () {
    !CanvasTextIssue && userId && saveSubscriptionStampDesign()
  })
