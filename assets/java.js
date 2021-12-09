$(document).ready(function () {

    $(".menuIcon i").click(function () {
      $(".menu").addClass("active");
    });
    $(".close i").click(function () {
      $(".menu").removeClass("active");
    });
  

    $(function () {
      $(".nav-links li").hover(
        function () {
          $(">ul.sub:not(:animated)", this).slideDown(350);
        },
        function () {
          $(">ul.sub", this).slideUp(70);
        }
      );
    });

    $(".menu-links .sub").hide();
    $(".list").click(function () {
      $(this).find(".rightIcn").toggleClass("ndeg udeg");
      $(this).next(".sub").slideToggle(200);
    });

    let allheadcategory = document.querySelectorAll(".category");
    let allposts = document.querySelectorAll(".post .all");
  
    for (let i = 0; i < allheadcategory.length; i++) {
      allheadcategory[i].addEventListener(
        "click",
        filterPosts.bind(this, allheadcategory[i])
      );
    }
  
    function filterPosts(item) {
      changeActive(item);
      for (let i = 0; i < allposts.length; i++) {
        if (allposts[i].classList.contains(item.attributes.id.value)) {
          allposts[i].style.display = "block";
        } else allposts[i].style.display = "none";
      }
    }
    function changeActive(activeitem) {
      for (let i = 0; i < allheadcategory.length; i++) {
        allheadcategory[i].classList.remove("active");
      }
      activeitem.classList.add("active");
    }

    $("#reviews .owl-carousel").owlCarousel({
      loop: true,
      margin: 10,
      dots: false,
      nav: true,
      autoplay: true,
      autoplaySpeed: 1000,
      smartSpeed: 1500,
  
      responsive: {
        0: {
          items: 1,
        },
      },
    });

    $(".parallax-window").parallax({
      imageSrc: "./assets/images/h3-background-img.jpg",
    });
  });

(function ($, window, document, undefined) {

    (function () {
      var lastTime = 0;
      var vendors = ["ms", "moz", "webkit", "o"];
      for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame =
          window[vendors[x] + "RequestAnimationFrame"];
        window.cancelAnimationFrame =
          window[vendors[x] + "CancelAnimationFrame"] ||
          window[vendors[x] + "CancelRequestAnimationFrame"];
      }
  
      if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function (callback) {
          var currTime = new Date().getTime();
          var timeToCall = Math.max(0, 16 - (currTime - lastTime));
          var id = window.setTimeout(function () {
            callback(currTime + timeToCall);
          }, timeToCall);
          lastTime = currTime + timeToCall;
          return id;
        };
  
      if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function (id) {
          clearTimeout(id);
        };
    })();
  
 
  
    function Parallax(element, options) {
      var self = this;
  
      if (typeof options == "object") {
        delete options.refresh;
        delete options.render;
        $.extend(this, options);
      }
  
      this.$element = $(element);
  
      if (!this.imageSrc && this.$element.is("img")) {
        this.imageSrc = this.$element.attr("src");
      }
  
      var positions = (this.position + "").toLowerCase().match(/\S+/g) || [];
  
      if (positions.length < 1) {
        positions.push("center");
      }
      if (positions.length == 1) {
        positions.push(positions[0]);
      }
  
      if (
        positions[0] == "top" ||
        positions[0] == "bottom" ||
        positions[1] == "left" ||
        positions[1] == "right"
      ) {
        positions = [positions[1], positions[0]];
      }
  
      if (this.positionX !== undefined)
        positions[0] = this.positionX.toLowerCase();
      if (this.positionY !== undefined)
        positions[1] = this.positionY.toLowerCase();
  
      self.positionX = positions[0];
      self.positionY = positions[1];
  
      if (this.positionX != "left" && this.positionX != "right") {
        if (isNaN(parseInt(this.positionX))) {
          this.positionX = "center";
        } else {
          this.positionX = parseInt(this.positionX);
        }
      }
  
      if (this.positionY != "top" && this.positionY != "bottom") {
        if (isNaN(parseInt(this.positionY))) {
          this.positionY = "center";
        } else {
          this.positionY = parseInt(this.positionY);
        }
      }
  
      this.position =
        this.positionX +
        (isNaN(this.positionX) ? "" : "px") +
        " " +
        this.positionY +
        (isNaN(this.positionY) ? "" : "px");
  
      if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
        if (this.imageSrc && this.iosFix && !this.$element.is("img")) {
          this.$element.css({
            backgroundImage: "url(" + this.imageSrc + ")",
            backgroundSize: "cover",
            backgroundPosition: this.position,
          });
        }
        return this;
      }
  
      if (navigator.userAgent.match(/(Android)/)) {
        if (this.imageSrc && this.androidFix && !this.$element.is("img")) {
          this.$element.css({
            backgroundImage: "url(" + this.imageSrc + ")",
            backgroundSize: "cover",
            backgroundPosition: this.position,
          });
        }
        return this;
      }
  
      this.$mirror = $("<div />").prependTo(this.mirrorContainer);
  
      var slider = this.$element.find(">.parallax-slider");
      var sliderExisted = false;
  
      if (slider.length == 0) this.$slider = $("<img />").prependTo(this.$mirror);
      else {
        this.$slider = slider.prependTo(this.$mirror);
        sliderExisted = true;
      }
  
      this.$mirror.addClass("parallax-mirror").css({
        visibility: "hidden",
        zIndex: this.zIndex,
        position: "fixed",
        top: 0,
        left: 0,
        overflow: "hidden",
      });
  
      this.$slider.addClass("parallax-slider").one("load", function () {
        if (!self.naturalHeight || !self.naturalWidth) {
          self.naturalHeight = this.naturalHeight || this.height || 1;
          self.naturalWidth = this.naturalWidth || this.width || 1;
        }
        self.aspectRatio = self.naturalWidth / self.naturalHeight;
  
        Parallax.isSetup || Parallax.setup();
        Parallax.sliders.push(self);
        Parallax.isFresh = false;
        Parallax.requestRender();
      });
  
      if (!sliderExisted) this.$slider[0].src = this.imageSrc;
  
      if (
        (this.naturalHeight && this.naturalWidth) ||
        this.$slider[0].complete ||
        slider.length > 0
      ) {
        this.$slider.trigger("load");
      }
    }
  

  
    $.extend(Parallax.prototype, {
      speed: 0.2,
      bleed: 0,
      zIndex: -100,
      iosFix: true,
      androidFix: true,
      position: "center",
      overScrollFix: false,
      mirrorContainer: "body",
  
      refresh: function () {
        this.boxWidth = this.$element.outerWidth();
        this.boxHeight = this.$element.outerHeight() + this.bleed * 2;
        this.boxOffsetTop = this.$element.offset().top - this.bleed;
        this.boxOffsetLeft = this.$element.offset().left;
        this.boxOffsetBottom = this.boxOffsetTop + this.boxHeight;
  
        var winHeight = Parallax.winHeight;
        var docHeight = Parallax.docHeight;
        var maxOffset = Math.min(this.boxOffsetTop, docHeight - winHeight);
        var minOffset = Math.max(
          this.boxOffsetTop + this.boxHeight - winHeight,
          0
        );
        var imageHeightMin =
          (this.boxHeight + (maxOffset - minOffset) * (1 - this.speed)) | 0;
        var imageOffsetMin =
          ((this.boxOffsetTop - maxOffset) * (1 - this.speed)) | 0;
        var margin;
  
        if (imageHeightMin * this.aspectRatio >= this.boxWidth) {
          this.imageWidth = (imageHeightMin * this.aspectRatio) | 0;
          this.imageHeight = imageHeightMin;
          this.offsetBaseTop = imageOffsetMin;
  
          margin = this.imageWidth - this.boxWidth;
  
          if (this.positionX == "left") {
            this.offsetLeft = 0;
          } else if (this.positionX == "right") {
            this.offsetLeft = -margin;
          } else if (!isNaN(this.positionX)) {
            this.offsetLeft = Math.max(this.positionX, -margin);
          } else {
            this.offsetLeft = (-margin / 2) | 0;
          }
        } else {
          this.imageWidth = this.boxWidth;
          this.imageHeight = (this.boxWidth / this.aspectRatio) | 0;
          this.offsetLeft = 0;
  
          margin = this.imageHeight - imageHeightMin;
  
          if (this.positionY == "top") {
            this.offsetBaseTop = imageOffsetMin;
          } else if (this.positionY == "bottom") {
            this.offsetBaseTop = imageOffsetMin - margin;
          } else if (!isNaN(this.positionY)) {
            this.offsetBaseTop =
              imageOffsetMin + Math.max(this.positionY, -margin);
          } else {
            this.offsetBaseTop = (imageOffsetMin - margin / 2) | 0;
          }
        }
      },
  
      render: function () {
        var scrollTop = Parallax.scrollTop;
        var scrollLeft = Parallax.scrollLeft;
        var overScroll = this.overScrollFix ? Parallax.overScroll : 0;
        var scrollBottom = scrollTop + Parallax.winHeight;
  
        if (
          this.boxOffsetBottom > scrollTop &&
          this.boxOffsetTop <= scrollBottom
        ) {
          this.visibility = "visible";
          this.mirrorTop = this.boxOffsetTop - scrollTop;
          this.mirrorLeft = this.boxOffsetLeft - scrollLeft;
          this.offsetTop = this.offsetBaseTop - this.mirrorTop * (1 - this.speed);
        } else {
          this.visibility = "hidden";
        }
  
        this.$mirror.css({
          transform:
            "translate3d(" +
            this.mirrorLeft +
            "px, " +
            (this.mirrorTop - overScroll) +
            "px, 0px)",
          visibility: this.visibility,
          height: this.boxHeight,
          width: this.boxWidth,
        });
  
        this.$slider.css({
          transform:
            "translate3d(" +
            this.offsetLeft +
            "px, " +
            this.offsetTop +
            "px, 0px)",
          position: "absolute",
          height: this.imageHeight,
          width: this.imageWidth,
          maxWidth: "none",
        });
      },
    });
  
    $.extend(Parallax, {
      scrollTop: 0,
      scrollLeft: 0,
      winHeight: 0,
      winWidth: 0,
      docHeight: 1 << 30,
      docWidth: 1 << 30,
      sliders: [],
      isReady: false,
      isFresh: false,
      isBusy: false,
  
      setup: function () {
        if (this.isReady) return;
  
        var self = this;
  
        var $doc = $(document),
          $win = $(window);
  
        var loadDimensions = function () {
          Parallax.winHeight = $win.height();
          Parallax.winWidth = $win.width();
          Parallax.docHeight = $doc.height();
          Parallax.docWidth = $doc.width();
        };
  
        var loadScrollPosition = function () {
          var winScrollTop = $win.scrollTop();
          var scrollTopMax = Parallax.docHeight - Parallax.winHeight;
          var scrollLeftMax = Parallax.docWidth - Parallax.winWidth;
          Parallax.scrollTop = Math.max(0, Math.min(scrollTopMax, winScrollTop));
          Parallax.scrollLeft = Math.max(
            0,
            Math.min(scrollLeftMax, $win.scrollLeft())
          );
          Parallax.overScroll = Math.max(
            winScrollTop - scrollTopMax,
            Math.min(winScrollTop, 0)
          );
        };
  
        $win
          .on("resize.px.parallax load.px.parallax", function () {
            loadDimensions();
            self.refresh();
            Parallax.isFresh = false;
            Parallax.requestRender();
          })
          .on("scroll.px.parallax load.px.parallax", function () {
            loadScrollPosition();
            Parallax.requestRender();
          });
  
        loadDimensions();
        loadScrollPosition();
  
        this.isReady = true;
  
        var lastPosition = -1;
  
        function frameLoop() {
          if (lastPosition == window.pageYOffset) {
           
            window.requestAnimationFrame(frameLoop);
            return false;
          } else lastPosition = window.pageYOffset;
  
          self.render();
          window.requestAnimationFrame(frameLoop);
        }
  
        frameLoop();
      },
  
      configure: function (options) {
        if (typeof options == "object") {
          delete options.refresh;
          delete options.render;
          $.extend(this.prototype, options);
        }
      },
  
      refresh: function () {
        $.each(this.sliders, function () {
          this.refresh();
        });
        this.isFresh = true;
      },
  
      render: function () {
        this.isFresh || this.refresh();
        $.each(this.sliders, function () {
          this.render();
        });
      },
  
      requestRender: function () {
        var self = this;
        self.render();
        self.isBusy = false;
      },
      destroy: function (el) {
        var i,
          parallaxElement = $(el).data("px.parallax");
        parallaxElement.$mirror.remove();
        for (i = 0; i < this.sliders.length; i += 1) {
          if (this.sliders[i] == parallaxElement) {
            this.sliders.splice(i, 1);
          }
        }
        $(el).data("px.parallax", false);
        if (this.sliders.length === 0) {
          $(window).off("scroll.px.parallax resize.px.parallax load.px.parallax");
          this.isReady = false;
          Parallax.isSetup = false;
        }
      },
    });
  
    function Plugin(option) {
      return this.each(function () {
        var $this = $(this);
        var options = typeof option == "object" && option;
  
        if (this == window || this == document || $this.is("body")) {
          Parallax.configure(options);
        } else if (!$this.data("px.parallax")) {
          options = $.extend({}, $this.data(), options);
          $this.data("px.parallax", new Parallax(this, options));
        } else if (typeof option == "object") {
          $.extend($this.data("px.parallax"), options);
        }
        if (typeof option == "string") {
          if (option == "destroy") {
            Parallax.destroy(this);
          } else {
            Parallax[option]();
          }
        }
      });
    }
  
    var old = $.fn.parallax;
  
    $.fn.parallax = Plugin;
    $.fn.parallax.Constructor = Parallax;
  
  
    $.fn.parallax.noConflict = function () {
      $.fn.parallax = old;
      return this;
    };

  
    $(function () {
      $('[data-parallax="scroll"]').parallax();
    });
  })(jQuery, window, document);
  

  $(function () {
    var mainpc01 = $("#slidertype1");
    var mainpc02 = $("#slidertype2");
    var mainpc03 = $("#slidertype3");
    var mainpc04 = $("#slidertype4");
    var mainpc05 = $("#slidertype5");
  
    var slide_num = 3;
    var fadeSpeed = 1500;
    var countspeed = 2700;
    var countspeed2 = fadeSpeed - 100;
  
    function init() {
      mainpc01.hide().stop();
      mainpc02.hide().stop();
      mainpc03.hide().stop();
      mainpc04.hide().stop();
      mainpc05.hide().stop();
    }
  
    $(window).load(function () {
      init();
      var count = 1;
      var pic_num = 1;
      var stop_count = 1;
      var repeat = 0;
  
      (function loop() {
        if (count == 1) {
        
          $("#slidertype" + pic_num)
            .css({ display: "block", opacity: "0" })
            .animate({ opacity: "1" }, fadeSpeed);
        } else if (count == 2) {
    
          $("#slidertype" + pic_num)
            .css({ display: "block", opacity: "1" })
            .animate({ opacity: "0" }, fadeSpeed);
        } else if (count == 3) {
        
          $("#slidertype" + pic_num).hide();
  
       
          pic_num = pic_num + 1;
          stop_count = stop_count + 1;
  
        
          if (repeat >= 1) {
            pic_num = 1;
            stop_count = 1;
            repeat = 0;
          }
  
          $("#slidertype" + pic_num)
            .css({ display: "block", opacity: "0" })
            .animate({ opacity: "1" }, fadeSpeed);
        }
  
        count = count + 1;
  
   
        if (stop_count == slide_num) {
          repeat = repeat + 1;
        }
  
        if (count == 4) {
          count = 2;
        }
  
        if (count == 2) {
          setTimeout(loop, countspeed);
        } else if (count == 3) {
          setTimeout(loop, countspeed2);
        }
      })();
    });
  });
$(document).ready(function () {
  $("#Accordion1 .elements").find(".title").mouseover(function () {
      if ($(this).next().css("display") === "none") {
          $(this).css({
              transition: "all 0.2s ease-out",
              background: "#f34f3f"
          });
          $(this).find("h6").css({ color: "#ffffff" });
          $(this).find("i").css({ color: "#ffffff" });
          $(this).find("i").removeClass("fas fa-plus");
          $(this).find("i").addClass("fas fa-minus");
      }
  });

  $("#Accordion1 .elements").find(".title").mouseleave(function () {
      if ($(this).next().css("display") === "none") {
          $(this).css({
              transition: "all 0.2s ease-out",
              background: "#ffffff"
          });
          $(this).find("h6").css({ color: "#1b1b1b" });
          $(this).find("i").css({ color: "#1b1b1b" });
          $(this).find("i").removeClass("fas fa-minus");
          $(this).find("i").addClass("fas fa-plus");
      }
  });

  $("#Accordion1 .elements").first().find(".title").click(function () {
      if ($(this).next().css("display") === "none") {
          $(this).css({
              transition: "all 0.2s ease-out",
              background: "#f34f3f"
          });
          $(this).find("h6").css({ color: "#ffffff" });
          $(this).find("i").css({ color: "#ffffff" });
          $(this).find("i").removeClass("fas fa-plus");
          $(this).find("i").addClass("fas fa-minus");
      }
      else {
          $(this).css({
              transition: "all 0.2s ease-out",
              background: "#ffffff"
          });
          $(this).find("h6").css({ color: "#1b1b1b" });
          $(this).find("i").css({ color: "#1b1b1b" });
          $(this).find("i").removeClass("fas fa-minus");
          $(this).find("i").addClass("fas fa-plus");
      }

      $("#Accordion1 .elements").first().find(".title").not($(this)).find("i").removeClass("fas fa-minus");
      $("#Accordion1 .elements").first().find(".title").not($(this)).find("i").addClass("fas fa-plus");

      $("#Accordion1 .elements").first().find(".title").not($(this)).find("i").css({ color: "#1b1b1b" });
      $("#Accordion1 .elements").first().find(".title").not($(this)).find("h6").css({ color: "#1b1b1b" });
      $("#Accordion1 .elements").first().find(".title").not($(this)).css({ background: "#ffffff" });


      $(this).next().slideToggle(500);
      $("#Accordion1 .elements").first().find(".content").not($(this).next()).slideUp(500);
  });

  $("#Accordion1 .elements").last().find(".title").click(function () {
      if ($(this).next().css("display") === "none") {
          $(this).css({
              transition: "all 0.2s ease-out",
              background: "#f34f3f"
          });
          $(this).find("h6").css({ color: "#ffffff" });
          $(this).find("i").css({ color: "#ffffff" });
          $(this).find("i").removeClass("fas fa-plus");
          $(this).find("i").addClass("fas fa-minus");
      }
      else {
          $(this).css({
              transition: "all 0.2s ease-out",
              background: "#ffffff"
          });
          $(this).find("h6").css({ color: "#1b1b1b" });
          $(this).find("i").css({ color: "#1b1b1b" });
          $(this).find("i").removeClass("fas fa-minus");
          $(this).find("i").addClass("fas fa-plus");
      }

      $("#Accordion1 .elements").last().find(".title").not($(this)).find("i").removeClass("fas fa-minus");
      $("#Accordion1 .elements").last().find(".title").not($(this)).find("i").addClass("fas fa-plus");

      $("#Accordion1 .elements").last().find(".title").not($(this)).find("i").css({ color: "#1b1b1b" });
      $("#Accordion1 .elements").last().find(".title").not($(this)).find("h6").css({ color: "#1b1b1b" });
      $("#Accordion1 .elements").last().find(".title").not($(this)).css({ background: "#ffffff" });

      $(this).next().slideToggle(500);
      $("#Accordion1 .elements").last().find(".content").not($(this).next()).slideUp(500);
  })

});

$(document).ready(function () {
  $("#Accordion2 .elements").find(".title").mouseover(function () {
      if ($(this).next().css("display") === "none") {
          $(this).find("h6").css({
              color: "#f34f3f",
              transition: "all 0.2s"
          });
          $(this).find("i").css({
              color: "#f34f3f",
              transition: "all 0.2s"
          });
          $(this).find("i").removeClass("fas fa-plus");
          $(this).find("i").addClass("fas fa-minus");
      }
  });

  $("#Accordion2 .elements").find(".title").mouseleave(function () {
      if ($(this).next().css("display") === "none") {
          $(this).find("h6").css({
              color: "#1b1b1b",
              transition: "all 0.2s"
          });
          $(this).find("i").css({
              color: "#1b1b1b",
              transition: "all 0.2s"
          });
          $(this).find("i").removeClass("fas fa-minus");
          $(this).find("i").addClass("fas fa-plus");
      }
  });

  $("#Accordion2 .elements").first().find(".title").click(function () {
      if ($(this).next().css("display") === "none") {
          $(this).find("h6").css({
              color: "#f34f3f",
              transition: "all 0.2s"
          });
          $(this).find("i").css({
              color: "#f34f3f",
              transition: "all 0.2s"
          });
          $(this).find("i").removeClass("fas fa-plus");
          $(this).find("i").addClass("fas fa-minus");
      }
      else {
          $(this).find("h6").css({
              color: "#1b1b1b",
              transition: "all 1s"
          });
          $(this).find("i").css({
              color: "#1b1b1b",
              transition: "all 0.2s"
          });
          $(this).find("i").removeClass("fas fa-minus");
          $(this).find("i").addClass("fas fa-plus");
      }
      $("#Accordion2 .elements").first().find(".title").not($(this)).find("i").removeClass("fas fa-minus");
      $("#Accordion2 .elements").first().find(".title").not($(this)).find("i").addClass("fas fa-plus");
      $("#Accordion2 .elements").first().find(".title").not($(this)).find("i").css({ color: "#1b1b1b" });
      $("#Accordion2 .elements").first().find(".title").not($(this)).find("h6").css({ color: "#1b1b1b" });
      $(this).next().slideToggle(500);
      $("#Accordion2 .elements").first().find(".content").not($(this).next()).slideUp(500);
  });

  $("#Accordion2 .elements").last().find(".title").click(function () {
      if ($(this).next().css("display") === "none") {
          $(this).find("h6").css({
              color: "#f34f3f",
              transition: "all 0.2s"
          });
          $(this).find("i").css({
              color: "#f34f3f",
              transition: "all 0.2s"
          });
          $(this).find("i").removeClass("fas fa-plus");
          $(this).find("i").addClass("fas fa-minus");
      }
      else {
          $(this).find("h6").css({
              color: "#1b1b1b",
              transition: "all 1s"
          });
          $(this).find("i").css({
              color: "#1b1b1b",
              transition: "all 0.2s"
          });
          $(this).find("i").removeClass("fas fa-minus");
          $(this).find("i").addClass("fas fa-plus");
      }

      $("#Accordion2 .elements").last().find(".title").not($(this)).find("i").removeClass("fas fa-minus");
      $("#Accordion2 .elements").last().find(".title").not($(this)).find("i").addClass("fas fa-plus");

      $("#Accordion2 .elements").last().find(".title").not($(this)).find("i").css({ color: "#1b1b1b" });
      $("#Accordion2 .elements").last().find(".title").not($(this)).find("h6").css({ color: "#1b1b1b" });


      $(this).next().slideToggle(500);
      $("#Accordion2 .elements").last().find(".content").not($(this).next()).slideUp(500);
  })
});
$('.owl-carousel').owlCarousel({
  loop:true,
  margin:10,
  nav:true,
  responsive:{
      0:{
          items:1
      },
      600:{
          items:2
      },
      1000:{
          items:4
      }
  }
})
$(document).ready(function () {

  let category = document.querySelectorAll(".Tabloct1 .category");
  let catContent = document.querySelectorAll(".Tabloct1 .content .all");

  for (let i = 0; i < category.length; i++) {
    category[i].addEventListener(
      "click",
      filterContents.bind(this, category[i])
    );
  }

  function filterContents(item) {
    changeActive(item);
    for (let i = 0; i < catContent.length; i++) {
      if (catContent[i].classList.contains(item.attributes.id.value)) {
        catContent[i].style.display = "block";
      } else catContent[i].style.display = "none";
    }
  }
  function changeActive(activeitem) {
    for (let i = 0; i < category.length; i++) {
      category[i].classList.remove("active2");
    }
    activeitem.classList.add("active2");
  }


  let category1 = document.querySelectorAll(".Tabloct2 .category");
  let catContent1 = document.querySelectorAll(".Tabloct2 .content .all");

  for (let i = 0; i < category1.length; i++) {
    category1[i].addEventListener(
      "click",
      filterContents1.bind(this, category1[i])
    );
  }

  function filterContents1(item) {
    changeActive1(item);
    for (let i = 0; i < catContent1.length; i++) {
      if (catContent1[i].classList.contains(item.attributes.id.value)) {
        catContent1[i].style.display = "block";
      } else catContent1[i].style.display = "none";
    }
  }
  function changeActive1(activeitem1) {
    for (let i = 0; i < category.length; i++) {
      category1[i].classList.remove("active2");
    }
    activeitem1.classList.add("active2");
  }

  let category2 = document.querySelectorAll(".Tabloct3 .category");
  let catContent2 = document.querySelectorAll(".Tabloct3 .content .all");

  for (let i = 0; i < category2.length; i++) {
    category2[i].addEventListener(
      "click",
      filterContents2.bind(this, category2[i])
    );
  }

  function filterContents2(item) {
    changeActive2(item);
    for (let i = 0; i < catContent2.length; i++) {
      if (catContent2[i].classList.contains(item.attributes.id.value)) {
        catContent2[i].style.display = "block";
      } else catContent2[i].style.display = "none";
    }
  }
  function changeActive2(activeitem2) {
    for (let i = 0; i < category.length; i++) {
      category2[i].classList.remove("active2");
    }
    activeitem2.classList.add("active2");
  }

  let category3 = document.querySelectorAll(".Tabloct4 .category");
  let catContent3 = document.querySelectorAll(".Tabloct4 .content .all");

  for (let i = 0; i < category3.length; i++) {
    category3[i].addEventListener(
      "click",
      filterContents3.bind(this, category3[i])
    );
  }

  function filterContents3(item) {
    changeActive3(item);
    for (let i = 0; i < catContent3.length; i++) {
      if (catContent3[i].classList.contains(item.attributes.id.value)) {
        catContent3[i].style.display = "block";
      } else catContent3[i].style.display = "none";
    }
  }
  function changeActive3(activeitem3) {
    for (let i = 0; i < category.length; i++) {
      category3[i].classList.remove("active2");
    }
    activeitem3.classList.add("active2");
  }
});
$('.loading').each(function () {
  $(this).prop('Counter', 0).animate({
      Counter: $(this).text()
  }, {
      duration: 2600,
      easing: 'swing',
      step: function (now) {
          $(this).text(Math.ceil(now));
      }
  });
});