---
layout: default
---

<body>
  
  <div class="index-wrapper">
  <div>
  <span class="bg s_ipt_wr quickdelete-wrap">
	<span class="soutu-btn"></span>
	<input id="kw" name="wd" class="s_ipt" value="" maxlength="255" autocomplete="off">
	<a href="javascript:;" id="quickdelete" title="清空" class="quickdelete" style="top: 0px; right: 0px; display: none;">
	</a>
	</span>
	<span class="bg s_btn_wr"><input type="submit" id="su" value="搜索" class="bg s_btn"></span>
  </div>
    <div class="aside">
      <div class="info-card">
        <h1>RHX1998</h1>
		
		
		
      </div>
      <div id="particles-js"></div>
    </div>

    <div class="index-content">
      <ul class="artical-list">
        {% for post in site.categories.blog %}
        <li>
          <a href="{{ post.url }}" class="title">{{ post.title }}</a>
          <div class="title-desc">{{ post.description }}</div>
        </li>
        {% endfor %}
      </ul>
    </div>
  </div>
</body>
