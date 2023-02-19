import * as React from 'react';

const Logo = ({ width = '500', height = '500', ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${width} ${height}`} fill="currentColor" {...props}>
    <path
      d="M285.25 15.7188C281.022 15.6638 276.819 15.7177 272.594 15.875C257.914 16.4217 243.343 18.4446 229 21.5938C212.471 25.2227 196.277 30.5122 180.719 37.1562C128.143 59.6087 81.2579 98.1412 56.3125 150.344C46.7207 170.416 40.6016 192.145 38.375 214.281C37.7016 220.976 37.3534 227.709 37.375 234.438C37.3841 237.278 37.5563 240.099 37.5938 242.938C37.6117 244.3 37.5162 247.271 37.375 252.531C36.9937 253.558 36.9828 254.529 37.3125 255.406C37.3198 255.426 37.3049 255.45 37.3125 255.469C38.7318 280.219 37.7698 271.983 38.7188 280.219C40.6815 297.252 44.7352 314.037 50.75 330.094C71.0157 384.193 113.569 428.401 167.406 449.656C185.54 456.816 204.705 461.278 224.125 462.969C230.121 463.491 236.138 463.75 242.156 463.75C244.599 463.75 247.027 463.71 249.469 463.625C250.079 463.604 250.702 463.534 251.312 463.562C254.857 463.728 257.841 465.853 260.969 467.281C264.75 469.009 268.736 470.419 272.75 471.5C274.404 471.946 276.069 472.406 277.781 472.562C280.244 472.788 282.749 472.709 285.219 472.688C288.514 472.659 291.838 472.552 295.125 472.312C297.928 472.109 300.709 471.826 303.5 471.5C304.943 471.331 306.396 471.26 307.812 470.938C309.369 470.583 310.888 469.992 312.406 469.5C313.916 469.011 315.405 468.514 316.906 468C323.063 465.893 329.159 463.558 335.156 461.031C338.225 459.738 341.303 458.431 344.281 456.938C350.975 453.58 357.47 449.8 363.844 445.875C368.008 443.31 372.194 440.67 376.188 437.844C378.747 436.032 381.183 434.059 383.625 432.094C387.178 429.235 390.665 426.292 394.062 423.25C397.297 420.353 400.525 417.417 403.531 414.281C406.315 411.377 408.908 408.251 411.438 405.125C414.991 400.734 418.366 396.2 421.5 391.5C425.28 385.831 428.566 379.771 431.5 373.625C432.427 371.683 433.262 369.706 434.156 367.75C435.983 363.754 438.061 359.879 439.812 355.844C441.098 352.884 442.289 349.902 443.406 346.875C443.775 345.875 444.1 344.832 444.5 343.844C445.763 340.721 447.197 337.698 448.438 334.562C450.29 329.879 451.856 325.122 453.438 320.344C454.343 317.608 455.384 314.895 456.281 312.156C457.362 308.858 458.363 305.535 459.281 302.188C461.28 294.9 462.86 287.522 464.062 280.062C464.714 276.022 465.311 271.923 465.656 267.844C466.15 262.01 466.363 256.166 466.344 250.312C466.322 243.83 465.842 237.371 465.062 230.938C464.438 225.785 463.655 220.632 462.531 215.562C461.548 211.124 460.433 206.707 459.156 202.344C458.522 200.176 457.781 198.045 457.156 195.875C456.212 192.594 455.501 189.254 454.562 185.969C453.013 180.543 451.23 175.191 449.25 169.906C441.095 148.135 429.284 127.734 414.438 109.844C406.751 100.581 398.246 91.9992 389.062 84.2188C385.723 81.3891 382.295 78.6417 378.781 76.0312C377.036 74.7348 375.183 73.6171 373.688 72.0312C372.648 70.9291 371.462 69.8085 370.594 68.5625C370.007 67.7204 369.56 66.7863 369.031 65.9062C368.242 64.5915 367.45 63.2928 366.625 62C364.983 59.4277 363.254 56.8816 361.469 54.4062C357.029 48.25 352.31 42.2647 347.125 36.7188C345.738 35.2348 344.297 33.795 342.844 32.375C342.478 32.0172 342.16 31.6188 341.75 31.3125C341.317 30.9889 340.814 30.7666 340.344 30.5C339.406 29.9685 338.48 29.4495 337.531 28.9375C335.601 27.8956 333.628 26.9002 331.656 25.9375C328.661 24.475 325.64 23.0923 322.562 21.8125C320.974 21.1517 319.424 20.4862 317.75 20.0625C313.52 18.9919 309.119 18.2726 304.812 17.5938C300.36 16.8919 295.87 16.272 291.375 15.9062C289.336 15.7403 287.294 15.7453 285.25 15.7188ZM214.438 75.5938C218.062 75.5442 221.692 75.6102 225.312 75.7812C228.384 75.9263 231.439 76.2423 234.5 76.5C237.803 76.7781 241.101 76.8102 244.406 77.0938C248.272 77.4254 252.089 78.0357 255.938 78.5C258.114 78.7626 260.343 78.718 262.531 78.8125C265.901 78.958 269.266 79.194 272.625 79.5C274.878 79.7053 277.13 79.9386 279.375 80.2188C280.506 80.3598 281.612 80.5899 282.75 80.6562C284.719 80.7711 286.745 80.6564 288.719 80.6875C292.05 80.74 295.392 80.8324 298.719 81C309.99 81.5679 321.152 82.9287 332.25 84.9688C334.839 85.4447 337.425 85.9536 340 86.5C341.285 86.7726 342.58 86.9875 343.844 87.3438C345.058 87.6861 345.998 88.1095 347.156 88.5938C348.219 89.0381 349.316 89.4235 350.312 90C351.647 90.7717 352.92 91.8627 354.156 92.7812C356.265 94.3482 358.33 95.944 360.375 97.5938C368.579 104.212 376.236 111.504 383.281 119.344C399.735 137.653 412.768 158.927 421.594 181.906C423.943 188.022 426.003 194.248 427.75 200.562C428.48 203.2 429.296 205.898 429.781 208.594C430.482 212.485 430.788 216.502 431.125 220.438C431.761 227.87 432.082 235.353 432.094 242.812C432.101 247.484 431.922 252.148 431.688 256.812C431.456 261.421 431.191 266.002 430.719 270.594C430.312 274.545 429.723 278.476 429.156 282.406C427.595 293.233 425.338 303.913 422.125 314.375C420.572 319.433 418.953 324.593 416.812 329.438C415.057 333.411 413.004 337.275 410.938 341.094C409.166 344.367 407.41 347.744 405.344 350.844C403.473 353.65 401.287 356.3 399.188 358.938C396.785 361.956 394.309 364.895 391.75 367.781C390.676 368.993 389.593 370.208 388.438 371.344C385.268 374.459 381.902 377.393 378.5 380.25C372.49 385.297 366.148 390.087 359.531 394.312C357.058 395.892 354.488 397.284 351.969 398.781C349.281 400.379 346.686 402.087 343.906 403.531C342.056 404.493 340.099 405.293 338.25 406.25C336.659 407.073 335.139 407.985 333.531 408.781C331.778 409.649 329.953 410.383 328.188 411.219C326.349 412.089 324.65 413.274 322.844 414.219C321.352 415 319.815 415.711 318.281 416.406C317.752 416.646 317.18 416.816 316.688 417.125C316.013 417.548 315.453 418.089 314.812 418.562C313.088 419.838 311.334 421.117 309.531 422.281C306.164 424.457 302.653 426.303 299.156 428.25C296.963 429.471 294.891 430.896 292.719 432.156C289.107 434.251 285.429 436.24 281.688 438.094C279.015 439.418 276.314 440.684 273.594 441.906C271.1 443.026 268.488 444.129 265.75 444.5C264.711 444.641 263.673 444.598 262.625 444.625C261.569 444.652 260.494 444.679 259.438 444.688C255.707 444.718 252.007 444.631 248.281 444.438C234.024 443.696 219.861 441.277 206.156 437.281C167.132 425.903 132.459 401.738 107.531 369.719C95.6831 354.5 86.0323 337.539 78.9688 319.594C72.5106 303.187 78.9684 319.569 64.8438 244.594C64.8452 244.552 64.8423 244.572 64.8438 244.531C65.2539 232.64 64.7506 236.502 65.25 232.562C65.6957 229.047 66.4415 225.531 67.1562 222.062C69.0313 212.963 71.5 203.98 74.5 195.188C85.6179 162.601 104.347 132.207 130 109.062C144.968 95.5579 162.481 84.6177 182.156 79.625C192.716 76.9453 203.564 75.7423 214.438 75.5938Z"
      fill="currentColor"
      stroke="none"
    />
    <path
      d="M267.406 40.9688C263.639 40.9931 259.87 41.0859 256.094 41.1875C252.501 41.2842 248.905 41.2746 245.312 41.4375C238.119 41.7637 230.941 42.4177 223.812 43.4375C198.249 47.0942 173.32 55.1673 150.375 67C138.262 73.2468 126.688 80.5245 115.844 88.7812C112.933 90.9977 110.082 93.3022 107.281 95.6562C105.888 96.827 104.539 98.075 103.125 99.2188C101.109 100.85 98.9555 102.445 96.8125 103.906C92.5954 106.781 88.2977 109.51 84.1562 112.5C73.5804 120.136 63.4412 128.448 53.8438 137.281C50.9215 139.971 48.0435 142.708 45.2188 145.5C44.0766 146.629 42.8845 147.71 41.8125 148.906C40.3985 150.484 39.1361 152.26 37.8438 153.938C35.6615 156.77 33.5443 159.651 31.4688 162.562C29.3955 165.471 27.3652 168.42 25.4062 171.406C24.2578 173.157 23.084 174.884 22.125 176.75C21.237 178.478 20.4549 180.292 19.6562 182.062C18.0658 185.587 16.5674 189.118 15.1562 192.719C13.7598 196.282 12.312 199.905 11.2812 203.594C9.96521 208.304 9.00383 213.13 8.125 217.938C7.36385 222.101 6.66916 226.317 6.25 230.531C4.54454 247.677 5.36089 265.105 8.5625 282.031C13.3198 307.182 23.3505 331.338 37.2188 352.812C50.7824 373.815 68.2787 392.198 88.1875 407.281C107.185 421.674 128.476 433.051 150.938 441C157.963 443.486 165.118 445.645 172.344 447.469C175.408 448.242 178.489 448.865 181.562 449.594C183.326 450.012 181.545 449.587 193.781 452.812C194.731 453.867 196.437 454.026 198.375 453.719C204.426 454.954 207.202 455.632 211.688 456.312C229.459 459.007 247.573 459.496 265.469 457.812C330.804 451.666 393.433 416.505 431.094 362.5C442.37 346.33 451.333 328.561 457.531 309.844C459.375 304.276 460.959 298.613 462.312 292.906C462.855 290.619 463.381 288.336 463.844 286.031C463.959 285.458 463.983 284.87 464.156 284.312C464.57 282.983 465.233 281.719 465.906 280.5C467.531 277.56 469.616 274.86 471.469 272.062C475.691 265.686 479.749 259.205 483.594 252.594C484.835 250.46 486.15 248.322 487.156 246.062C488.336 243.412 489.254 240.629 490.25 237.906C491.489 234.517 492.691 231.118 493.812 227.688C494.702 224.968 495.557 222.21 496.375 219.469C496.578 218.79 496.773 218.118 496.969 217.438C497.165 216.756 497.464 216.109 497.562 215.406C497.645 214.815 497.515 214.191 497.5 213.594C497.485 212.997 497.489 212.409 497.469 211.812C497.39 209.443 497.28 207.084 497.125 204.719C496.856 200.604 496.44 196.499 495.938 192.406C495.725 190.678 495.576 188.913 495.156 187.219C494.75 185.579 494.169 183.953 493.656 182.344C492.97 180.189 492.257 178.037 491.5 175.906C490.365 172.712 489.135 169.572 487.844 166.438C487.413 165.392 487.024 164.299 486.531 163.281C485.552 161.258 484.258 159.368 483.062 157.469C481.25 154.588 479.355 151.759 477.406 148.969C476.101 147.1 474.772 145.263 473.406 143.438C472.725 142.527 472.084 141.582 471.344 140.719C470.582 139.83 469.727 139.023 468.906 138.188C466.848 136.093 464.761 134.047 462.625 132.031C458.748 128.372 454.77 124.753 450.594 121.438C445.36 117.283 439.862 113.421 434.281 109.75C432.225 108.398 430.118 107.133 428.062 105.781C426.568 104.798 425.134 103.706 423.688 102.656C421.28 100.91 418.845 99.1885 416.375 97.5312C413.389 95.5274 410.354 93.5879 407.281 91.7188C406.253 91.093 405.19 90.5412 404.188 89.875C403.227 89.2367 402.343 88.4859 401.406 87.8125C399.526 86.4602 397.61 85.1362 395.688 83.8438C391.321 80.9071 386.814 78.2501 382.312 75.5312C379.859 74.0494 377.51 72.4299 375.062 70.9375C372.109 69.1369 369.099 67.4062 366.062 65.75C359.382 62.1063 352.498 58.8199 345.469 55.9062C341.616 54.3091 337.741 52.7826 333.781 51.4688C327.958 49.5366 322.027 47.8736 316.062 46.4375C309.318 44.8134 302.503 43.6509 295.625 42.75C290.014 42.015 284.373 41.4125 278.719 41.1562C274.942 40.9851 271.174 40.9444 267.406 40.9688ZM240.281 60.2812C244.798 60.4616 249.344 61.0952 253.812 61.75C260.513 62.7318 267.199 63.9666 273.781 65.5625C281.66 67.4726 289.487 69.7525 297.125 72.4688C310.373 77.18 323.284 82.9219 335.406 90.0625C338.176 91.694 340.907 93.3919 343.594 95.1562C345.372 96.3237 347.165 97.4725 348.844 98.7812C351.706 101.012 354.427 103.479 357.094 105.938C359.384 108.049 361.628 110.217 363.812 112.438C364.541 113.178 365.3 113.893 365.969 114.688C366.944 115.848 367.796 117.191 368.656 118.438C370.402 120.968 372.067 123.544 373.688 126.156C374.771 127.904 375.846 129.657 376.875 131.438C377.645 132.77 378.446 134.117 379.062 135.531C380.105 137.923 380.922 140.413 381.781 142.875C383.526 147.876 385.017 152.962 386.438 158.062C387.72 162.665 389.012 167.243 390.062 171.906C390.65 174.517 391.199 177.15 391.688 179.781C391.883 180.835 392.01 181.892 392.25 182.938C392.599 184.458 393.102 185.959 393.5 187.469C394.301 190.507 395.03 193.583 395.688 196.656C396.127 198.712 396.529 200.776 396.906 202.844C397.188 204.389 397.38 205.942 397.75 207.469C398.11 208.955 398.605 210.428 399 211.906C399.792 214.874 400.509 217.872 401.156 220.875C401.805 223.883 402.24 226.929 402.875 229.938C403.286 231.883 404.031 233.751 404.594 235.656C405.437 238.511 406.209 241.418 406.906 244.312C407.371 246.241 407.788 248.151 408.188 250.094C408.287 250.578 408.373 251.078 408.469 251.562C408.564 252.047 408.555 252.577 408.75 253.031C408.945 253.485 409.339 253.817 409.625 254.219C409.914 254.624 410.213 255.03 410.5 255.438C411.634 257.049 412.729 258.667 413.812 260.312C415.423 262.757 416.989 265.255 418.469 267.781C419.196 269.023 419.8 270.397 420.594 271.594C421.444 272.875 422.636 273.923 423.688 275.031C425.465 276.904 427.214 278.799 428.906 280.75C430.915 283.066 432.847 285.447 434.719 287.875C435.687 289.131 436.405 290.187 436.688 291.781C436.774 292.267 436.838 292.789 436.812 293.281C436.755 294.38 436.382 295.423 436.156 296.5C435.93 297.58 435.715 298.674 435.469 299.75C434.732 302.973 433.904 306.163 433 309.344C429.365 322.138 424.399 334.551 418.125 346.281C411.042 359.524 402.333 371.894 392.188 382.969C377.81 398.663 360.549 411.708 341.469 421.156C320.835 431.373 341.476 421.149 214.25 434.25C213.442 433.366 212.073 433.176 210.531 433.281C206.014 432.13 205.785 432.215 202.938 431.156C200.964 430.422 199.043 429.522 197.125 428.656C194.25 427.359 191.397 426.006 188.594 424.562C178.427 419.326 168.77 413.156 159.75 406.125C115.708 371.793 88.4764 317.928 85.4062 262.312C84.4668 245.294 85.6637 228.109 88.9062 211.375C90.3244 204.056 92.0432 196.752 94.125 189.594C95.1525 186.06 96.3814 182.586 97.5312 179.094C98.5873 175.886 99.3899 172.588 100.438 169.375C101.594 165.826 102.986 162.382 104.25 158.875C104.813 157.312 105.072 155.679 105.438 154.062C105.791 152.501 106.174 150.92 106.594 149.375C107.213 147.093 107.877 144.837 108.625 142.594C108.872 141.854 109.227 141.141 109.375 140.375C109.566 139.388 109.45 138.255 109.531 137.25C109.673 135.501 109.885 133.739 110.125 132C110.967 125.893 112.665 120.011 115 114.312C115.582 112.893 116.214 111.509 116.875 110.125C117.399 109.028 117.862 107.979 118.594 107C119.354 105.982 120.193 104.929 121.094 104.031C122.072 103.056 123.193 102.17 124.25 101.281C126.026 99.7889 127.823 98.3264 129.656 96.9062C136.85 91.3341 144.479 86.3556 152.469 82C172.454 71.1053 194.532 64.2534 217.125 61.5938C222.213 60.9948 227.318 60.5956 232.438 60.4062C235.034 60.3102 237.683 60.1775 240.281 60.2812Z"
      fill="currentColor"
      fillOpacity="0.6"
      stroke="none"
    />
    <path
      d="M202.969 22.3125C200.009 22.1351 196.955 22.3271 194 22.5C189.088 22.7875 184.214 23.2661 179.344 23.9688C175.841 24.4741 172.318 25.0437 168.844 25.7188C167.92 25.8982 166.994 26.0083 166.094 26.2812C165.16 26.5642 164.279 27.0077 163.375 27.375C162.468 27.7435 161.56 28.1234 160.656 28.5C158.876 29.2422 157.112 29.9804 155.344 30.75C149.058 33.485 142.861 36.4267 136.75 39.5312C132.327 41.7781 127.848 44.0467 123.625 46.6562C116.32 51.1701 109.292 56.2103 102.438 61.375C98.0798 64.6583 93.7084 68.0069 89.5938 71.5938C87.0468 73.814 84.6782 76.2473 82.3125 78.6562C78.9276 82.103 75.6488 85.6446 72.4688 89.2812C69.504 92.6716 66.4428 96.088 63.8125 99.75C62.2086 101.983 60.8065 104.386 59.4062 106.75C57.1314 110.59 54.9672 114.509 53.0312 118.531C51.728 121.239 50.4341 123.979 49.3438 126.781C47.9288 130.418 46.7178 134.175 45.6875 137.938C44.9798 140.522 44.3319 143.127 43.7812 145.75C43.462 147.27 43.241 148.796 42.9062 150.312C42.4408 152.421 41.701 154.482 41.125 156.562C40.2707 159.647 39.4762 162.743 38.8125 165.875C38.3761 167.934 37.9822 170.019 37.625 172.094C37.4476 173.124 37.3664 174.171 37.125 175.188C36.7389 176.814 36.1168 178.423 35.6562 180.031C34.8873 182.717 34.1834 185.409 33.5312 188.125C32.6195 191.922 31.9505 195.743 31.1562 199.562C30.6839 201.835 30.0338 204.085 29.5 206.344C28.5591 210.325 27.7112 214.346 27 218.375C25.6742 225.885 24.7841 233.453 24.2812 241.062C24.0094 245.177 23.7647 249.343 23.8438 253.469C23.9226 257.584 24.2098 261.681 24.5625 265.781C24.9182 269.916 25.2929 274.09 25.9688 278.188C26.6384 282.248 27.6106 286.288 28.5938 290.281C29.7054 294.796 30.8893 299.321 32.4062 303.719C34.0909 308.603 36.0659 313.402 38.1562 318.125C39.0794 320.211 40.1584 322.27 41.0312 324.375C41.4711 325.436 41.7813 326.539 42.1562 327.625C42.9047 329.792 43.6812 331.952 44.5 334.094C46.5306 339.404 48.7693 344.619 51.2188 349.75C61.3199 370.908 74.9855 390.358 91.4688 407.031C100.023 415.684 109.35 423.596 119.281 430.625C122.9 433.186 126.6 435.613 130.375 437.938C131.322 438.521 132.262 439.12 133.219 439.688C133.697 439.971 134.248 440.159 134.688 440.5C135.092 440.815 135.404 441.247 135.75 441.625C136.731 442.695 137.943 443.88 138.656 445.156C138.912 445.614 139.048 446.11 139.25 446.594C139.85 448.032 140.486 449.454 141.125 450.875C142.607 454.174 144.183 457.445 145.906 460.625C149.587 467.415 153.562 474.099 158.156 480.312C159.392 481.983 160.67 483.622 162 485.219C162.337 485.623 162.593 486.073 163 486.406C163.428 486.757 163.985 486.95 164.469 487.219C164.949 487.486 165.423 487.77 165.906 488.031C167.383 488.83 168.869 489.602 170.375 490.344C174.518 492.386 178.755 494.208 183.062 495.875C184.772 496.537 186.403 497.236 188.219 497.562C190.23 497.924 192.314 498.115 194.344 498.344C197.096 498.654 199.832 498.914 202.594 499.125C207.619 499.509 212.708 499.796 217.75 499.781C220.88 499.772 224.01 499.465 227.125 499.188C231.18 498.827 235.214 498.372 239.25 497.844C254.68 495.823 269.824 492.401 284.719 487.906C297.861 483.94 310.723 479.083 323.25 473.469C332.468 469.337 341.496 464.735 350.281 459.75C386.868 438.992 420.17 410.777 442.969 375.125C450.627 363.149 456.976 350.293 461.844 336.938C469.827 315.032 473.664 291.682 473.094 268.375C472.93 261.672 472.399 254.961 471.531 248.312C471.165 245.505 470.737 242.726 470.25 239.938C470.054 238.813 469.783 237.693 469.625 236.562C469.44 235.241 469.29 232.05 469 227.188C469.191 226.113 469.169 225.093 468.812 224.156C468.802 224.128 468.824 224.091 468.812 224.062C468.807 224.049 468.787 224.045 468.781 224.031C468.773 224.012 468.789 223.988 468.781 223.969C465.192 199.266 466.892 207.432 465.219 199.25C461.758 182.326 456.224 165.839 448.781 150.25C432.942 117.072 408.344 88.2657 378 67.5C359.479 54.8253 338.865 45.1979 317.25 39.1562C297.766 33.7102 277.505 31.1676 257.281 31.5312C251.57 31.6339 245.842 31.9885 240.156 32.5312C238.221 32.716 236.305 32.9198 234.375 33.1562C233.731 33.2352 233.086 33.4002 232.438 33.4062C231.89 33.4113 231.351 33.2894 230.812 33.1875C228.525 32.7544 227.143 31.546 225.219 30.375C224.291 29.8102 223.328 29.2726 222.375 28.75C218.196 26.4575 213.599 24.7346 209 23.5C207.01 22.9659 205.034 22.4363 202.969 22.3125ZM232.969 60.1562C249.212 59.7189 265.5 61.616 281.25 65.5938C337.048 79.6858 383.807 119.651 408.5 171.375C415.569 186.182 408.577 171.469 427.531 241.281C427.543 241.31 427.519 241.346 427.531 241.375C428.094 249.912 427.965 247.071 428.094 249.906C428.146 251.047 428.213 252.205 428.125 253.344C428.033 254.543 427.822 255.715 427.656 256.906C427.325 259.281 426.965 261.668 426.562 264.031C425.175 272.174 423.351 280.242 421.094 288.188C412.016 320.144 396 350.617 373.281 375C365.197 383.676 356.297 391.71 346.25 398.062C341.755 400.905 336.954 403.51 331.875 405.156C327.246 406.657 322.459 407.451 317.625 407.906C315.695 408.088 313.78 408.274 311.844 408.375C309.585 408.493 307.321 408.479 305.062 408.562C302.921 408.642 300.769 408.749 298.625 408.75C296.28 408.751 293.967 408.536 291.625 408.5C290.488 408.483 289.352 408.62 288.219 408.688C285.783 408.832 283.315 408.922 280.875 408.938C279.179 408.948 277.508 408.922 275.812 408.875C274.489 408.838 273.167 408.714 271.844 408.844C270.208 409.004 268.57 409.296 266.938 409.5C264.737 409.775 262.522 410.029 260.312 410.219C257.498 410.46 254.666 410.649 251.844 410.781C250.133 410.861 248.355 410.76 246.656 410.969C244.493 411.234 242.306 411.819 240.156 412.188C236.49 412.817 232.811 413.372 229.125 413.875C216.496 415.598 203.837 416.399 191.094 416.469C188.099 416.485 185.088 416.468 182.094 416.406C180.598 416.375 179.115 416.418 177.625 416.281C176.28 416.158 175.179 415.842 173.875 415.531C172.693 415.249 171.495 415.066 170.375 414.594C169.899 414.393 169.476 414.076 169.031 413.812C168.142 413.285 167.256 412.761 166.375 412.219C164.168 410.86 161.995 409.446 159.844 408C151.634 402.481 143.813 396.353 136.531 389.656C118.193 372.792 103.106 352.483 92.1875 330.094C89.3385 324.251 86.7708 318.247 84.5 312.156C83.5668 309.653 82.472 307.03 81.8438 304.438C81.5781 303.341 81.4357 302.206 81.25 301.094C80.9697 299.414 80.7106 297.717 80.4688 296.031C79.5739 289.795 79.0109 283.525 78.4688 277.25C77.8676 270.293 77.7518 263.352 77.6875 256.375C77.6452 251.781 77.5518 247.188 77.7188 242.594C77.8623 238.642 78.2015 234.725 78.4688 230.781C79.2379 219.433 80.7395 208.19 83.2812 197.094C83.9862 194.016 84.7419 190.946 85.5938 187.906C86.0181 186.392 86.4485 184.881 87 183.406C88.7233 178.799 90.8462 174.293 93 169.875C94.1799 167.454 95.4144 165.06 96.6875 162.688C96.9419 162.213 97.184 161.706 97.4688 161.25C98.4069 159.746 99.5374 158.328 100.594 156.906C102.693 154.081 104.871 151.323 107.094 148.594C109.606 145.509 112.085 142.281 114.938 139.5C120.439 134.136 126.51 129.225 132.656 124.625C138.587 120.186 144.618 115.849 151.125 112.281C152.21 111.686 153.363 111.173 154.438 110.562C155.355 110.041 156.208 109.403 157.125 108.875C159.188 107.686 161.308 106.559 163.5 105.625C164.617 105.149 165.809 104.763 166.906 104.25C167.917 103.778 168.821 103.118 169.844 102.656C170.34 102.432 170.833 102.19 171.344 102C171.833 101.818 172.486 101.715 172.875 101.344C173.105 101.124 173.221 100.802 173.438 100.562C173.848 100.11 174.3 99.6015 174.75 99.1875C175.071 98.8926 175.965 98.3327 176.156 97.9688C176.411 97.4834 176.532 96.9257 176.781 96.4375C177.661 94.7144 178.511 93.0242 179.719 91.5C180.938 89.9613 182.183 88.4003 183.562 87C184.211 86.3416 184.912 85.7503 185.562 85.0938C187.242 83.3991 188.739 81.525 190.438 79.8438C194.564 75.7588 199.049 72.0469 203.688 68.5625C206.753 66.2596 209.797 63.7474 213.344 62.2188C213.915 61.9726 214.493 61.7236 215.094 61.5625C216.034 61.3103 217.033 61.3285 218 61.2188C218.978 61.1077 219.957 60.9997 220.938 60.9062C224.938 60.5249 228.952 60.2644 232.969 60.1562Z"
      fill="currentColor"
      fillOpacity="0.3"
      stroke="none"
    />
  </svg>
);

export default Logo;
