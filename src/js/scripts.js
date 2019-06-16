//main scripts

$(function () {
  $('[data-toggle="tooltip"]').tooltip({
    trigger: 'hover', sanitize: false, sanitizeFn: content => content
 })
})
