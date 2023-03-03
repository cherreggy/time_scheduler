(function () {
  // 日期更新
  setDate();
  function addZero(str) {
    if (str < 10) {
      str = "0" + str;
    }
    return str;
  }
  function setDate() {
    var date = new Date(); // 创建日期对象
    var year = date.getFullYear(); //年
    var month = date.getMonth() + 1; //月
    var day = date.getDate(); //日
    var hour = date.getHours(); //时
    var min = date.getMinutes(); //分
    var sec = date.getSeconds(); //秒
    var date_part = document.querySelector(".date");
    //   console.log(date_part);
    date_part.innerHTML =
      year +
      " 年 " +
      month +
      " 月 " +
      day +
      " 日 &nbsp;" +
      addZero(hour) +
      ": " +
      addZero(min) +
      ": " +
      addZero(sec);
  }
  setInterval(function () {
    setDate();
  }, 1000);

  //   添加新项目
  var add = document.querySelector(".add");

  // 添加事件监听器
  add.addEventListener("click", function () {
    // 获取输入框元素
    var input_area = document.querySelector("input");
    // 获取输入框内容
    var content = input_area.value;
    if (content.trim() === "") {
      alert("输入内容不能为空！");
      return;
    }
    // 获取开始时间
    var start_time = document.querySelector("#start").value;
    var start_hour = start_time.slice(0, 2);
    var start_min = start_time.slice(3);

    // 获取结束时间
    var end_time = document.querySelector("#end").value;
    var end_hour = end_time.slice(0, 2);
    var end_min = end_time.slice(3);

    // 获取任务类型
    var color_list = {
      学习: "orange",
      工作: "skyblue",
      生活: "pink",
      娱乐: "purple",
      其它: "olivedrab",
    };
    var type = document.querySelector("#tag").value;
    // console.log(type);

    // 创建新li对象
    var new_li = document.createElement("li");
    // 为li添加其所属类
    new_li.classList.add("plan-item");
    // 填入li的内容
    new_li.innerHTML = `
    <div style="display: flex">
              <!-- 点击完成按钮 -->
              <span class="fin iconfont icon-kongxinduigou"></span>
              <div>
                <p>
                  ${content}
                </p>
                <!-- 计划时间段 -->
                <div class="plan-timeline">计划时间：${start_hour}:${start_min} ~ ${end_hour}:${end_min}</div>
              </div>
            </div>
            <div class="tag-item">${type}</div>
            <!-- 删除按钮，移入显示 -->
            <span class="del iconfont icon-icon-cross-empty"></span>
            <!-- 点击收藏按钮 -->
            <span class="fav iconfont icon-shoucang"></span>
    `;
    // 修改标签颜色
    new_li.querySelector(".tag-item").style.backgroundColor = color_list[type];
    //   将li添加到ul
    plan_list.childNodes[0].before(new_li);
    // 添加新计划项动画
    new_li.classList.add("animate__animated", "animate__zoomIn");
    // 清空输入框
    input_area.value = "";
  });

  //   键盘事件
  this.addEventListener("keyup", function (e) {
    var add = document.querySelector(".add");
    // 按键输入
    if (e.code === "Enter") {
      // 触发click事件
      add.click();
    }
  });

  //   事件委托：点击勾选按钮和收藏按钮
  var plan_list = document.querySelector("ul");
  plan_list.addEventListener("click", function (e) {
    // console.dir(e.target.classList);
    if (e.target.classList.contains("fin")) {
      // 点击勾选按钮逻辑
      var target = e.target.parentNode.parentNode; // 获取点击的子元素li
      var child = target.children[0].children[0];
      // 如果该计划没完成，其中检查所有项目是否完成，完成显示表情包
      if (child.classList[2] === "icon-kongxinduigou") {
        // 改变该子元素勾选按钮的类
        child.classList.remove("icon-kongxinduigou");
        child.classList.add("icon-duigou");
        // 将该子元素插入到末尾
        plan_list.appendChild(target);
        // 添加中划线
        target.children[0].children[1].children[0].style.textDecoration =
          "line-through";
        // 检查项目是否全部完成
        var flag = 1;
        var all_li = document.querySelectorAll(".plan-item");
        for (let i = 0; i < all_li.length; i++) {
          // 对勾是空心证明没完成，直接结束循环
          if (
            all_li[i]
              .querySelector(".fin")
              .classList.contains("icon-kongxinduigou")
          ) {
            flag = 0;
            break;
          }
        }
        // 如果通过检查
        if (flag === 1) {
          document.querySelector(".cong").style.opacity = "1";
        } else {
          document.querySelector(".cong").style.opacity = "0";
        }
      } else {
        // 改变该子元素勾选按钮的类
        child.classList.remove("icon-duigou");
        child.classList.add("icon-kongxinduigou");
        // 将该子元素插入到开头
        // 如果只有一个元素不进行移动操作
        if (plan_list.children.length !== 1) {
          plan_list.insertBefore(target, plan_list.children[0]);
        }
        // 去掉中划线
        target.children[0].children[1].children[0].style.textDecoration =
          "none";
        document.querySelector(".cong").style.opacity = "0";
      }
    }
    if (e.target.classList.contains("fav")) {
      //点击收藏按钮逻辑
      console.dir(e.target);
      //   交换类
      if (e.target.classList.contains("icon-shoucang")) {
        e.target.classList.remove("icon-shoucang");
        e.target.classList.add("icon-shoucang1");
        e.target.classList.add("animate__animated", "animate__bounceIn");
      } else if (e.target.classList.contains("icon-shoucang1")) {
        e.target.classList.remove("icon-shoucang1");
        e.target.classList.add("icon-shoucang");
        e.target.classList.remove("animate__animated", "animate__bounceIn");
      }
      // console.dir(e.target.classList);
    }
    // 删除事件监听
    if (e.target.classList.contains("del")) {
      // console.log("del");
      var li = e.target.parentNode; // 获取对应的点击对象li
      console.dir(li);
      // 播放动画
      li.classList.add("animate__animated");
      li.classList.remove("animate__zoomIn");
      li.classList.add("animate__zoomOut");
      setTimeout(function () {
        plan_list.removeChild(li);
        // 检查项目是否全部完成
        var flag = 1;
        var all_li = document.querySelectorAll(".plan-item");
        if (all_li.length === 0) {
          flag = 0;
        }
        for (let i = 0; i < all_li.length; i++) {
          // 对勾是空心证明没完成，直接结束循环
          if (
            all_li[i]
              .querySelector(".fin")
              .classList.contains("icon-kongxinduigou")
          ) {
            flag = 0;
            break;
          }
        }
        // 如果通过检查
        if (flag === 1) {
          document.querySelector(".cong").style.opacity = "1";
        } else {
          document.querySelector(".cong").style.opacity = "0";
        }
      }, 300);
    }
  });

  // 清空按钮
  var clear_but = document.querySelector(".clear");
  clear_but.addEventListener("click", function () {
    var plan_list = document.querySelector("ul");
    //对所有li元素按下删除直到ul为空
    var timer = setInterval(function () {
      if (plan_list.querySelectorAll("li").length === 0) {
        clearInterval(timer);
      } else {
        // 播放动画
        plan_list.querySelectorAll("li")[0].classList.add("animate__animated");
        plan_list.querySelectorAll("li")[0].classList.remove("animate__zoomIn");
        plan_list.querySelectorAll("li")[0].classList.add("animate__zoomOut");
        setTimeout(function () {
          plan_list.removeChild(plan_list.querySelectorAll("li")[0]);
        }, 500);
      }
    }, 300);
    // 表情包消失
    document.querySelector(".cong").style.opacity = "0";
  });
})();
