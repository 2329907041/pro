<template>
  <div class="nox">
    <div class="title">
      <span>{{title}}</span>
      <svg
        t="1676278095258"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="1656"
        width="16"
        height="16"
      >
        <path
          d="M613.888 715.264h-41.984C448.512 715.264 348.16 614.912 348.16 491.52s99.84-223.232 223.232-223.232h41.984c123.392 0 223.232 99.84 223.232 223.232 0.512 123.392-99.328 223.744-222.72 223.744z"
          fill="#CAD3FF"
          opacity=".2"
          p-id="1657"
        ></path>
        <path
          d="M513.536 914.432c-105.472 0-205.312-39.936-281.088-113.152-77.824-74.752-121.344-175.104-122.88-282.624-3.584-221.696 175.104-404.992 398.336-408.576 223.232-3.072 407.552 174.08 411.136 395.776 1.536 94.72-22.528 171.008-75.264 240.128a25.3952 25.3952 0 0 1-35.84 4.608 25.3952 25.3952 0 0 1-4.608-35.84c45.568-59.392 66.048-125.44 64.512-207.872-3.072-193.536-164.352-348.672-358.912-345.6-195.584 2.56-351.232 162.816-348.16 356.352 1.536 93.696 39.424 181.248 107.52 246.784 67.584 65.536 157.184 100.352 251.392 98.816 17.92-0.512 35.328-2.048 52.736-4.608 13.824-2.048 27.136 7.168 29.184 20.992s-7.168 27.136-20.992 29.184c-19.968 3.072-39.936 5.12-60.416 5.632h-6.656z"
          fill="#4E63DD"
          p-id="1658"
        ></path>
        <path
          d="M640 894.976c-9.728 0-19.456-5.632-23.552-15.36-5.632-12.8 0.512-28.16 13.312-33.792 0.512 0 40.448-17.408 67.584-33.792 12.288-7.168 27.648-3.072 34.816 9.216 7.168 12.288 3.072 27.648-9.216 34.816-30.208 17.92-71.68 35.84-73.216 36.352-3.072 2.048-6.144 2.56-9.728 2.56zM764.416 822.272c-6.656 0-13.312-2.56-18.432-7.68-9.728-10.24-9.728-26.624 0.512-36.352l16.896-16.384c10.24-9.728 26.624-9.728 36.352 0.512 9.728 10.24 9.728 26.624-0.512 36.352l-16.896 16.384c-5.12 4.608-11.264 7.168-17.92 7.168z"
          fill="#4E63DD"
          p-id="1659"
        ></path>
        <path
          d="M472.064 386.048c-5.12 26.624-15.872 38.4-38.4 38.4-13.312 0-25.088-5.12-32.256-15.872 2.56-62.976 41.984-97.28 111.104-97.28 71.68 0 110.08 33.28 110.08 82.432 0 41.984-15.36 62.464-68.096 98.816-28.672 19.968-50.176 33.28-50.176 62.976v18.432h-21.504c-8.192-19.968-10.752-32.256-10.752-48.64 0-24.064 12.288-39.424 37.376-65.024 23.04-22.528 37.376-42.496 37.376-71.168 0-34.304-25.6-58.368-63.488-58.88l-11.264 55.808z m74.752 278.528c0 26.624-21.504 48.128-49.152 48.128-28.16 0-49.664-21.504-49.664-48.128 0-27.136 21.504-49.664 49.664-49.664 27.648 0 49.152 22.528 49.152 49.664z"
          fill="#4E63DD"
          opacity=".5"
          p-id="1660"
        ></path>
      </svg>
    </div>
    <div class="heard">{{count}}</div>
    <div class="content">
      <slot name='charts'>
        
      </slot>
    </div>
    <div class="footer"><slot name="foo">
        
      </slot></div>
  </div>
</template>

<script>
export default {
  name: "detail",
  props:['title','count'],
};
</script>

<style scope>
.nox .title {
  display: flex;
  justify-content: space-between;
  color: #1296db;
}
.nox .heard {
 margin: 10px 0px;
 font-size: 20px;
}
.nox .content{
   margin: 20px 0px 0px 0px;
   height: 40px;
}

.footer{
   border-top: 1px solid #eee;
   padding-top: 10px;
}
</style>