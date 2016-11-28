// define(function(require, exports, module) {
(function($) {
    // here we go!
    $.citySelect = function(element, options) {

        // plugin's default options
        // this is private property and is  accessible only from inside the plugin
        var defaults = {
            buttonTemplate: '<div class="sass-city-select"><span class="city-result"></span><i class="arrow"></i><input type="hidden" name="areaId" class="areaId" value="-1"></div>',
            cityShowTemplate: '<div class="sass-city-panel"></div>',

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
        plugin.eventsInit = function() {
            // code goes here
            getAll.getProvince();
            $element.on('shown.bs.tab', '.sass-city-panel a[data-toggle="tab"]:eq(1)', function(e) {
                if ($('#panel-province').find('.active').length == 0) {
                    alert('请先选择省份');
                    $('.sass-city-panel a[data-toggle="tab"]:eq(0)').tab('show');
                }

            }).on('click', '#panel-province span', function(e) { //选择省分
                $('#panel-province span').removeClass('active');
                $(this).addClass('active');
                $(".sass-province").html($(this).html());
                $('.sass-city-panel a[data-toggle="tab"]:eq(1)').tab('show');
            }).on('click', '#panel-city span', function(e) { //选择市
                $('#panel-city span').removeClass('active');
                $(this).addClass('active');
                $(".sass-city").html($(this).html());
                $('.sass-city-panel a[data-toggle="tab"]:eq(2)').tab('show');
            }).on('click', '#panel-area span', function(e) { //选择区县
                $('#panel-area span').removeClass('active');
                $(this).addClass('active');
                $(".sass-area").html($(this).html());
                $(".sass-city-panel").hide();
            })

            $(".city-input-box").on("click", function() {
                $(".sass-city-panel").toggle()
            })

        }
        var getAll = {}
        getAll.getProvince = function() {
                // $.ajax({
                //     url: 'http://localhost:8091/xfs-sps/serviceCompany/getchildArea?parent=0&_=1474967208975',
                //     type: 'get',
                //     dataType: 'json',
                // })
                // .done(function() {
                //     console.log("success");
                // })
                // .fail(function() {
                //     console.log("error");
                // })
                // .always(function() {
                //     console.log("complete");
                // });

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

