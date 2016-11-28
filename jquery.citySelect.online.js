// define(function(require, exports, module) {
(function($) {
    // here we go!
    $.citySelect = function(element, options) {

        // plugin's default options
        // this is private property and is  accessible only from inside the plugin
        var defaults = {
            buttonTemplate: '<div class="sass-city-select"></div>',
            cityInputBox:
            '    <div class="city-input-box">' +
            '        <span class="city-result">' +
            '           <span class="sass-province"></span>' +
            '           <span class="sass-city"></span>' +
            '           <span class="sass-area"></span>' +
            '        </span>' +
            '        <i class="arrow"></i>' +
            '    </div>',
            hideInput:'<input type="hidden" name="areaId" class="areaId" id="areaId" value="-1">',
            cityShowTemplate: '    <div class="sass-city-panel" style="display:none;">' +
            '        <div role="tabpanel">' +
            '            <!-- Nav tabs -->' +
            '            <ul class="scity-nav scity-nav-tabs clearfix" role="tablist">' +
            '                <li role="cityPanel" class="active">' +
            '                    <a href="#panel-province" aria-controls="panel-province" role="tab" data-toggle="tab">省份</a>' +
            '                </li>' +
            '                <li role="cityPanel">' +
            '                    <a href="#panel-city" aria-controls="panel-city" role="tab" data-toggle="tab">城市</a>' +
            '                </li>' +
            '                <li role="cityPanel">' +
            '                    <a href="#panel-area" aria-controls="panel-area" role="tab" data-toggle="tab">区县</a>' +
            '                </li>' +
            '            </ul>' +
            '            <!-- Tab panes -->' +
            '            <div class="tab-content">' +
            '                <div role="tabpanel" class="tab-pane active" id="panel-province">' +
            '                </div>' +
            '                <div role="tabpanel" class="tab-pane" id="panel-city">' +
            '                </div>' +
            '                <div role="tabpanel" class="tab-pane" id="panel-area">' +
            '                </div>' +
            '            </div>' +
            '        </div>' +
            '    </div>',

            // if your plugin is event-driven, you may provide callback capabilities
            // for its events. execute these functions before or after events of your
            // plugin, so that users may customize those particular events without
            // changing the plugin's code
            onFoo: function() {

            }

        }

        // to avoid confusions, use "plugin" to reference the
        // current instance of the object
        var plugin = this;

        // this will hold the merged default, and user-provided options
        // plugin's properties will be available through this object like:
        // plugin.settings.propertyName from inside the plugin or
        // element.data('pluginName').settings.propertyName from outside the plugin,
        // where "element" is the element the plugin is attached to;
        plugin.settings = {}

        var $element = $(element), // reference to the jQuery version of DOM element
            element = element; // reference to the actual DOM element

        // the "constructor" method that gets called when the object is created
        plugin.init = function() {

            // the plugin's final properties are the merged default and
            // user-provided options (if any)
            plugin.settings = $.extend({}, defaults, options);

            plugin.settings.areaType = plugin.settings.areaType || "DISTRICT";
            console.log(plugin.settings.areaType)
            plugin.domWrapInit();

            // code goes here
            // $element.html(plugin.settings.buttonTemplate);
            plugin.eventsInit();
        }

        // public methods
        // these methods can be called like:
        // plugin.methodName(arg1, arg2, ... argn) from inside the plugin or
        // element.data('pluginName').publicMethod(arg1, arg2, ... argn) from outside
        // the plugin, where "element" is the element the plugin is attached to;

        // a public method. for demonstration purposes only - remove it!
        plugin.domWrapInit = function(){
            $element.html(plugin.settings.buttonTemplate);
            var dowWrapStr = plugin.settings.cityInputBox + plugin.settings.hideInput + plugin.settings.cityShowTemplate;
            $element.find(".sass-city-select").append(dowWrapStr)
        };
        plugin.eventsInit = function() {
            // code goes here
            getAll.getProvince();
            $element.on('shown.bs.tab', '.sass-city-panel a[data-toggle="tab"]:eq(1)', function(e) {
                if ($('#panel-province').find('.active').length == 0) {
                    alert('请先选择省份');
                    $('.sass-city-panel a[data-toggle="tab"]:eq(0)').tab('show');
                }
                
            }).on('shown.bs.tab', '.sass-city-panel a[data-toggle="tab"]:eq(2)', function(e) {
                if ($('#panel-city').find('.active').length == 0) {
                    alert('请先选择城市');
                    $('.sass-city-panel a[data-toggle="tab"]:eq(1)').tab('show');
                }

            }).on('click', '#panel-province span', function(e) {//选择省分

                $('#panel-province span').removeClass('active');
                $(this).addClass('active');
                $(".sass-province").html("").html($(this).html());
                $(".sass-city").html("");
                $(".sass-area").html("");

                var areaId = $(this).attr("data-areaid"),areaType=$(this).attr("data-areatype");
                $("#areaId").val(areaId);
                getAll.getCity(areaId,areaType);

            }).on('click', '#panel-city span', function(e) {//选择市

                $('#panel-city span').removeClass('active');
                $(this).addClass('active');
                $(".sass-city").html("").html($(this).html()).prepend('<i class="gray">/</i>');
                $(".sass-area").html("");

                var areaId = $(this).attr("data-areaid"),areaType=$(this).attr("data-areatype");
                $("#areaId").val(areaId);
                getAll.getArea(areaId,areaType);
                // $('.sass-city-panel a[data-toggle="tab"]:eq(2)').tab('show');

            }).on('click','#panel-area span',function(e){//选择区县

                $('#panel-area span').removeClass('active');
                $(this).addClass('active');
                $(".sass-area").html("").html($(this).html()).prepend('<i class="gray">/</i>');

                var areaId = $(this).attr("data-areaid"),areaType=$(this).attr("data-areatype");
                $("#areaId").val(areaId);

                $(".sass-city-panel").hide();
                plugin.settings.filterArea(areaType);

            });

            $(".city-input-box").on("click", function() {
                $(".sass-city-panel").toggle()
            })
            $("body").on("click",function (e) {
                e = e || window.event;
                if (!$(e.target).closest('.sass-city-select').length && $(".sass-city-panel").is(':visible')) {
                    $(".sass-city-panel").hide();
                }
            })
        };
        var getAll={};
        getAll.getProvince=function(){
            var that =this;
            $.ajax({
                url: '/aaaa/bbbb/getchildArea?parent=0',
                type: 'get',
                dataType: 'json',
            })
            .done(function(response) {
                if (response.data.select.length > 0) {
                    that.renderDom(response.data.select,"province");
                }
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
                console.log("complete");
            });
        };
        getAll.getCity=function(parentCode,areaType){
            var that =this;
            $.ajax({
                    url: '/aaa/bbb/getchildArea?parent='+parentCode,
                    type: 'get',
                    dataType: 'json',
                })
                .done(function(response) {
                    if (response.data.select.length <= 0) {
                        $(".sass-city-panel").hide();
                        plugin.settings.filterArea(areaType);
                        return;
                    }
                    that.renderDom(response.data.select,"city");
                    if(areaType == plugin.settings.areaType){
                        $('.sass-city-panel li[role="cityPanel"]:eq(2)').hide();
                        $(".city-result .gray2").html("");
                        $(".sass-city-panel").hide();
                        plugin.settings.filterArea(areaType);
                        return
                    }
                    plugin.settings.filterArea(areaType);
                    $('.sass-city-panel li[role="cityPanel"]:eq(2)').show();
                    $('.sass-city-panel a[data-toggle="tab"]:eq(1)').tab('show');
                })
                .fail(function() {
                    console.log("error");
                })
                .always(function() {
                    console.log("complete");
                });
        };
        getAll.getArea=function(parentCode,areaType){
            var that =this;
            $.ajax({
                    url: '/aaa/bbbb/getchildArea?parent='+parentCode,
                    type: 'get',
                    dataType: 'json',
                })
                .done(function(response) {
                    if (response.data.select.length <= 0) {
                        $(".sass-city-panel").hide();
                        plugin.settings.filterArea(areaType);
                        return;
                    }
                    that.renderDom(response.data.select,"area");
                    if(areaType == plugin.settings.areaType){
                        $('.sass-city-panel li[role="cityPanel"]:eq(2)').hide();
                        $(".sass-city-panel").hide();
                        plugin.settings.filterArea(areaType);
                        return
                    }
                    plugin.settings.filterArea(areaType);
                    $('.sass-city-panel a[data-toggle="tab"]:eq(2)').tab('show');
                })
                .fail(function() {
                    console.log("error");
                })
                .always(function() {
                    console.log("complete");
                });
        };
        getAll.renderDom=function(responsedata,region){
            var that =this;
            if(region == "city" || region=="area"){
                var cityStr = "<ul><li class='clearfix'>";
                $.each(responsedata, function(index, value) {
                    cityStr+='<span data-areaid = '+value.areaId+' data-areatype='+value.areaType+' data-catetory ='+value.catetory+'>'+value.name+'</span>'
                });
                cityStr +="</li></ul>";
                if(region == "city"){
                    $("#panel-city").html(cityStr)
                }else{
                    $("#panel-area").html(cityStr)
                }
                return
            }

            var str="<ul>"
                ,str1="<li> <dl> <dt>A-G</dt> <dd>"
                ,str2="<li> <dl> <dt>H-K</dt> <dd>"
                ,str3="<li> <dl> <dt>L-S</dt> <dd>"
                ,str4="<li> <dl> <dt>T-Z</dt> <dd>";
            $.each(responsedata, function(index, value) {
                // console.log(value.name)
                // value.areaId
                // value.areaType
                // console.log(value.catetory)
                // console.log(value.name)
                switch(value.catetory)
                {
                    case 'A-G':
                        str1+='<span data-areaid = '+value.areaId+' data-areatype='+value.areaType+' data-catetory ='+value.catetory+'>'+value.name+'</span>'
                        break;
                    case 'H-K':
                        str2+='<span data-areaid = '+value.areaId+' data-areatype='+value.areaType+' data-catetory ='+value.catetory+'>'+value.name+'</span>'
                        break;
                    case 'L-S':
                        str3+='<span data-areaid = '+value.areaId+' data-areatype='+value.areaType+' data-catetory ='+value.catetory+'>'+value.name+'</span>'
                        break;
                    default:
                        str4+='<span data-areaid = '+value.areaId+' data-areatype='+value.areaType+' data-catetory ='+value.catetory+'>'+value.name+'</span>'
                }
            });
            str1+='</dd></dl></li>';
            str2+='</dd></dl></li>';
            str3+='</dd></dl></li>';
            str4+='</dd></dl></li>';
            str+=str1+str2+str3+str4;
            str+="</ul>";
            $("#panel-province").html(str);
        }
        // private methods
        // these methods can be called only from inside the plugin like:
        // methodName(arg1, arg2, ... argn)

        // a private method. for demonstration purposes only - remove it!
        var foo_private_method = function() {

            // code goes here

        }

        // fire up the plugin!
        // call the "constructor" method
        plugin.init();

    }

    // add the plugin to the jQuery.fn object
    $.fn.citySelect = function(options) {

        // iterate through the DOM elements we are attaching the plugin to
        return this.each(function() {

            // if plugin has not already been attached to the element
            if (undefined == $(this).data('citySelect')) {

                // create a new instance of the plugin
                // pass the DOM element and the user-provided options as arguments
                var plugin = new $.citySelect(this, options);

                // in the jQuery version of the element
                // store a reference to the plugin object
                // you can later access the plugin and its methods and properties like
                // element.data('pluginName').publicMethod(arg1, arg2, ... argn) or
                // element.data('pluginName').settings.propertyName
                $(this).data('citySelect', plugin);

            }

        });

    }

})(jQuery);
// });
