import * as React from 'react';

const Fire = ({ width = '1024', height = '1024', ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${width} ${height}`} fill="currentColor" {...props}>
    <g id="fire">
      <g opacity="1">
        <path
          d="M486 30.9062C486 251.955 199.938 446.98 199.938 681.031C199.938 853.384 339.647 993.094 512 993.094C447.48 993.094 394.969 940.614 394.969 876.094C394.969 827.411 422.066 790.631 450.75 751.688C480.852 710.833 512 668.577 512 609.531C512 606.71 513.821 604.184 516.5 603.312C519.205 602.467 522.143 603.448 523.781 605.75C593.607 703.518 629.031 794.475 629.031 876.094C629.031 940.614 576.52 993.094 512 993.094C684.353 993.094 824.062 853.384 824.062 681.031C824.063 485.989 720.031 342.969 720.031 342.969C720.031 342.969 720.048 433.994 642.031 460C642.031 460 655.031 394.983 655.031 329.969C655.031 178.226 550.975 63.3874 486 30.9062Z"
          fill="currentColor"
          fillRule="nonzero"
          opacity="1"
          stroke="none"
        />
        <path
          d="M504.594 408.062C503.983 408.149 503.363 408.299 502.781 408.562C500.48 409.616 499 411.933 499 414.469C499 512.237 448.232 584.612 403.438 648.469C365.651 702.34 329.969 753.213 329.969 811.062C329.969 907.385 405.198 986.261 499.969 992.5C441.082 986.452 394.969 936.55 394.969 876.094C394.969 827.411 422.066 790.631 450.75 751.688C480.852 710.833 512 668.577 512 609.531C512 606.71 513.821 604.184 516.5 603.312C519.205 602.467 522.143 603.448 523.781 605.75C593.607 703.518 629.031 794.475 629.031 876.094C629.031 936.55 582.918 986.452 524.031 992.5C618.802 986.262 694.031 907.385 694.031 811.062C694.031 570.302 511.565 411.136 509.719 409.562C508.285 408.324 506.426 407.802 504.594 408.062Z"
          fill="#ffffff"
          fillRule="nonzero"
          opacity="0.496124"
          stroke="none"
        />
        <path
          d="M512 1006.11C332.756 1006.11 186.929 860.281 186.929 681.037C186.929 558.355 262.332 446.986 335.265 339.27C406.092 234.662 472.991 135.854 472.991 30.8948C472.991 26.3828 475.332 22.2089 479.155 19.8294C482.991 17.4628 487.789 17.2548 491.807 19.2572C564.987 55.8472 668.034 176.436 668.034 329.96C668.034 371.413 662.95 412.385 659.075 437.585C706.432 407.145 707.043 343.691 707.043 342.963C707.043 337.333 710.67 332.34 716.028 330.597C721.372 328.881 727.236 330.766 730.565 335.317C734.908 341.299 837.071 484.031 837.071 681.037C837.071 860.281 691.244 1006.11 512 1006.11ZM498.087 53.0126C489.531 157.803 422.124 257.365 356.798 353.846C286.076 458.311 212.935 566.326 212.935 681.037C212.935 845.939 347.098 980.102 512 980.102C676.902 980.102 811.065 845.939 811.065 681.037C811.065 542.635 756.74 429.913 727.561 379.345C719.265 411.15 698.422 454.905 646.15 472.328C641.755 473.798 636.918 472.822 633.434 469.741C629.962 466.672 628.375 461.991 629.286 457.453C629.403 456.803 642.028 392.855 642.028 329.96C642.028 201.518 561.736 95.4669 498.087 53.0126Z"
          fill="#1f212b"
          fillRule="nonzero"
          opacity="1"
          stroke="none"
        />
        <path
          d="M638.102 603.02C635.657 603.02 633.317 601.642 632.211 599.275C630.157 594.906 628.05 590.654 625.931 586.428C624.319 583.217 625.619 579.316 628.831 577.703C632.042 576.104 635.956 577.404 637.555 580.603C639.727 584.933 641.885 589.289 643.992 593.762C645.513 597.013 644.122 600.874 640.871 602.409C639.961 602.825 639.025 603.02 638.102 603.02ZM667.67 681.037C664.848 681.037 662.261 679.191 661.429 676.356C656.345 658.984 650.298 641.69 643.446 624.982C642.08 621.666 643.667 617.869 646.996 616.504C650.311 615.139 654.108 616.725 655.473 620.054C662.495 637.178 668.697 654.888 673.911 672.702C674.926 676.148 672.936 679.75 669.49 680.764C668.879 680.959 668.268 681.037 667.67 681.037Z"
          fill="#1f212b"
          fillRule="nonzero"
          opacity="1"
          stroke="none"
        />
        <path
          d="M512 993.105C411.618 993.105 329.96 911.447 329.96 811.065C329.96 753.216 365.653 702.336 403.439 648.465C448.234 584.608 498.997 512.247 498.997 414.479C498.997 411.943 500.479 409.629 502.794 408.562C505.095 407.535 507.813 407.899 509.738 409.538C512.26 411.709 572.151 463.681 623.499 554.298C625.268 557.419 624.176 561.385 621.055 563.166C617.908 564.935 613.955 563.829 612.187 560.722C574.427 494.069 531.088 448.052 511.649 429.107C506.981 523.521 457.765 593.684 414.102 655.929C375.925 710.332 342.963 757.325 342.963 811.065C342.963 904.27 418.796 980.102 512 980.102C605.204 980.102 681.037 904.27 681.037 811.065C681.037 792.133 679.828 773.266 677.344 753.359C676.902 749.796 679.425 746.545 682.987 746.103C686.576 745.7 689.801 748.184 690.243 751.746C692.792 772.187 694.04 791.587 694.04 811.065C694.04 911.447 612.382 993.105 512 993.105Z"
          fill="#1f212b"
          fillRule="nonzero"
          opacity="1"
          stroke="none"
        />
        <path
          d="M597.65 759.054C595.023 759.054 592.553 757.455 591.577 754.867C589.952 750.589 588.262 746.324 586.48 742.046C585.102 738.731 586.675 734.921 589.991 733.542C593.333 732.19 597.117 733.738 598.495 737.053C600.328 741.461 602.058 745.856 603.722 750.238C604.996 753.593 603.306 757.351 599.951 758.625C599.21 758.924 598.417 759.054 597.65 759.054ZM580.785 720.046C578.367 720.046 576.039 718.693 574.921 716.366C570.799 707.81 566.508 699.241 561.84 690.633C560.124 687.473 561.294 683.534 564.453 681.817C567.6 680.101 571.553 681.271 573.269 684.431C578.028 693.221 582.436 701.972 586.636 710.709C588.197 713.947 586.831 717.822 583.594 719.382C582.696 719.837 581.734 720.046 580.785 720.046Z"
          fill="#1f212b"
          fillRule="nonzero"
          opacity="1"
          stroke="none"
        />
        <path
          d="M512 993.105C447.48 993.105 394.974 940.6 394.974 876.08C394.974 827.397 422.072 790.625 450.757 751.681C480.858 710.827 512 668.567 512 609.521C512 606.7 513.833 604.19 516.512 603.332C519.217 602.461 522.142 603.449 523.794 605.751C532.193 617.505 540.788 630.378 550.059 645.071C551.971 648.101 551.074 652.119 548.031 654.03C545.014 655.955 540.983 655.044 539.072 652.002C533.858 643.732 528.852 636.047 523.989 628.831C518.228 682.051 489.31 721.307 461.237 759.405C433.84 796.567 407.977 831.675 407.977 876.08C407.977 933.435 454.644 980.102 512 980.102C569.356 980.102 616.023 933.435 616.023 876.08C616.023 861.881 614.813 846.901 612.434 831.571C611.888 828.021 614.319 824.705 617.856 824.146C621.406 823.613 624.722 826.032 625.281 829.568C627.764 845.562 629.026 861.217 629.026 876.08C629.026 940.6 576.52 993.105 512 993.105Z"
          fill="#1f212b"
          fillRule="nonzero"
          opacity="1"
          stroke="none"
        />
      </g>
    </g>
  </svg>
);

export default Fire;
