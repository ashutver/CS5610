<%@ Page Language="C#" %>

<script runat="server">
    <%-- This demo page has no server side script --%>
</script>

<!DOCTYPE html>

<html lang="en">

<head>

<meta charset='utf-8' />

<title>Demo Home Page</title>
<!--
<style type="text/css">
    ul.master_navigation
    {
        font-size: 100%;
        font-weight: bold;
        text-align: center;
        list-style: none;
        margin: 0.5em 0;
        padding: 0;
        color:white
    }

    ul.master_navigation li
    {
        display: inline-block;
        padding: 0 0.5%;
    }

    a
    {
        color: #08f;
        font-weight: bold;
        text-decoration: none;
    }

    a:visited
    {
        color: #88f;
    }

    a:hover
    {
        color: #f00;
    }

    p
    {
        text-align: justify;
    }
</style> -->

<style type="text/css" media="screen">
    body {
        width:900px;
        max-width: 100%;
        margin-left: 100px;
        padding: 0;
        background-color:gray
    }

    .pad {
        padding: 10px;
    }
</style>
    <style type="text/css">
    ul.master_navigation
    { 
        font-family: Arial;
        font-size: 100%;
        font-weight: bold;
        text-align: center;
        list-style: none;
        margin: 0.5em 0;
        padding: 0;
        
    }

    ul.master_navigation li
    {
        display: inline-block;
        padding: 0 0.5%;
    }

    a
    {
        color: ghostwhite;
        font-weight: bold;
        text-decoration: none;
    }

    a:visited
    {
        color: #88f;
    }

    a:hover
    {
        color: #f00;
    }

    p
    {
        text-align: justify;
    }
    .pic{
        float: left ;
        height:400px;
        width: 300px;
    }
    .title_text{
        
        top:1em;
        color: ghostwhite;
        font-size: 30px;
        left:40em;
    }
    .about_me{
        top:1em;
        color: ghostwhite;
        font-size: 20px;
        left:40em;
    }
    .container{
        margin-left:295px;
        text-align:center;
    }
    .center_div {
        border: 4px solid white;
        margin-left:auto;
        margin-right:auto;
        width: 90%;
        background-color : #ghostwhite;
        color: ghostwhite;
        text-align: left;
        padding: 15px;
        font-size: 20px;
    }
</style>
</head>

<body>

<div class="pad">

<form id="form1" runat="server">

<div>

<ul class="master_navigation">
    <li><a href="sitestatistics/" target="_blank">SiteStatistics</a></li>
    <li><a href="statistics/" target="_blank">Statistics</a></li>
    <li><a href="source/" target="_blank">Source</a></li>
    <li><a href="search/" target="_blank">Search</a></li>
    <li><a href="searchtree/" target="_blank">SearchTree</a></li>
    <li><a href="textview/" target="_blank">TextView</a></li>
    <li><a href="filelist.aspx" target="_blank">FileList</a></li>
    <li><a href="autofile.aspx" target="_blank">AutoFile</a></li>
    <li><a href="images/autoimage.aspx" target="_blank">Images</a></li>
    <li><a href="blog/" target="_blank">Blog</a></li>
    <li><a href="story/index.htm?../Experiments/story.txt" target="_blank">Experiments</a></li>
</ul>

<hr />
    <div>
        <img class="pic" src="images/Ashutosh-Img.jpg" />
       <!--  <img src="../../images/F22.jpg" height="120" width="200">-->
    </div>
   <div class="container">
       <div class="center_div">
          <h2 >Ashutosh Verma</h2>
           <!--<h3>Computer Science Master's Student</h3>-->
           <p> Hello and welcome to my web page. This page will
                 be regularly updated as part of CS 5610.
            </p>
        </div>
   </div>
<hr />

</div>

</form>

</div>

</body>
</html>
