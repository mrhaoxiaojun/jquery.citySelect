

城市筛选公共组件（jquery.citySelect.js 最新代码以线上未准，本地只为静态展示） 线上用法：

```
<hrel="stylesheet" type="text/css" href="../../assets/css/bootstrap.css">
<hrel="stylesheet" type="text/css" href="../../assets/css/city.css">
<div id="jsCitySelect"></div>
<script src="../../assets/js/plugins/jquery.js"><script>
<script src="../../assets/js/plugins/bootstrap.js"><script>
<script src="../../assets/js/plugins/jquery.citySelect.online.js"><script>
<script >
    $('#jsCitySelect').citySelect({
        areaType:"CITY",//选择到市级
        //areaType:"DISTRICT",// 选择到区
        filterArea:function(areaType){
            //回调
            console.log($("#areaId").val())
            console.log(areaType)
        }
    });
<script>
```

比较简单，如结构不懂请看js源码