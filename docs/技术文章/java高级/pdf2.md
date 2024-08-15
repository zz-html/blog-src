---
title: 'Pdf pdfbox使用'
date: 2024-08-14 12:00:00
tags:
- 'SpringBoot'
- 'Pdf'
categories:
- 'java'
---
官网：http://www.jfree.org/jfreechart/  
准备工作：  
搭建springboot工程  

## 包引用
引入PDF包。
```
	<dependency>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-thymeleaf</artifactId>
	</dependency>
	<dependency>
		<groupId>org.xhtmlrenderer</groupId>
		<artifactId>flying-saucer-pdf-openpdf</artifactId>
		<version>9.1.22</version>
	</dependency>
	<dependency>
		<groupId>com.openhtmltopdf</groupId>
		<artifactId>openhtmltopdf-pdfbox</artifactId>
		<version>1.0.10</version>
	</dependency>
	<!-- Optional: 如果需要支持 base64 编码的图片 -->
	<dependency>
		<groupId>com.openhtmltopdf</groupId>
		<artifactId>openhtmltopdf-svg-support</artifactId>
		<version>1.0.10</version>
	</dependency>
```

如果需要绘制图形（例如饼图、折线图），需要结合JFreeChart使用。
```
    <dependency>
        <groupId>org.jfree</groupId>
        <artifactId>jfreechart</artifactId>
        <version>1.5.3</version>
    </dependency>
```

## 示例
resources/templates/pdf_template.html
```
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8" />
    <title>PDF Export</title>
    <style>
        body {
            font-family: 'simsun', sans-serif;
        }
    </style>
</head>
<body>
    <h1 class="header">PDF 导出示例z</h1>
    <p th:text="'用户姓名: ' + ${name}"></p>
    <p th:text="'当前时间: ' + ${currentDate}"></p>
	<div>img base64 test:</div>
    <div class="image-container">
		<img th:src="${imagePath}" alt="示例图片" width="300"/>
    </div> 
</body>
</html>
```

PdfController
```
@RestController
@RequestMapping("/pdf")
public class PdfController {

	@Autowired
	private SpringTemplateEngine templateEngine;

	/**
	 * 图片转Base64
	 */
	public static String encodeImageToBase64(String imagePath) throws IOException {
		byte[] imageBytes = Files.readAllBytes(Paths.get(imagePath));
		return Base64.getEncoder().encodeToString(imageBytes);
	}

	@GetMapping("/exportPdf")
	public void exportPdf(HttpServletResponse response, Model model) throws IOException {
		// 设置响应类型为 PDF
		response.setContentType("application/pdf");
		response.setHeader("Content-Disposition", "attachment; filename=export.pdf");

		String imgPath = new ClassPathResource("templates/test.png").getFile().getAbsolutePath();
		// 填充模型数据
		model.addAttribute("name", "张三");
		model.addAttribute("currentDate", LocalDateTime.now());
		model.addAttribute("imgPath", imgPath);
		// 图片路径，可以是绝对路径、相对路径或 base64 编码
		String base64Image = "data:image/jpeg;base64," + encodeImageToBase64(imgPath);
		model.addAttribute("imagePath", base64Image);

		// 渲染 Thymeleaf 模板为 HTML 字符串
		Context context = new Context();
		context.setVariables(model.asMap());
		String htmlContent = templateEngine.process("pdf_template", context);

		// 加载字体
		String fontPath = new ClassPathResource("fonts/SimSun.ttf").getFile().getAbsolutePath();
		// 将 HTML 转换为 PDF
		try (ByteArrayOutputStream os = new ByteArrayOutputStream()) {
			PdfRendererBuilder builder = new PdfRendererBuilder();
			builder.useFont(new FSSupplier<InputStream>() {
				@Override
				public InputStream supply() {
					try {
						return new FileInputStream(fontPath);
					} catch (FileNotFoundException e) {
						e.printStackTrace();
					}
					return null;
				}
			}, "simsun");
			builder.withHtmlContent(htmlContent, "");
			builder.toStream(os);
			builder.run();
			// 将 PDF 写入响应输出流
			response.getOutputStream().write(os.toByteArray());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
```

## JFreeChart图片转base64
```
	private String createPdfPie3() {
		String base64Image = null;
		try {
			// Step 1: 创建数据集
			DefaultPieDataset dataset = new DefaultPieDataset();
			dataset.setValue("类别A", 40);
			dataset.setValue("类别B", 30);
			dataset.setValue("类别C", 20);
			dataset.setValue("类别D", 10);
			// Step 2: 使用 JFreeChart 创建饼图
			JFreeChart pieChart = ChartFactory.createPieChart(
					"示例饼图", // 图表标题
					dataset,   // 数据集
					true,      // 是否显示图例
					true,
					false);
			// Step 3: 设置字体以显示中文
			PiePlot plot = (PiePlot) pieChart.getPlot();
			Font font = new Font("SimHei", Font.PLAIN, 24); // 使用 "SimHei" 或其他支持中文的字体
			pieChart.getTitle().setFont(font);              // 设置标题字体
			pieChart.getLegend().setItemFont(font);         // 设置图例字体
			plot.setLabelFont(font);                        // 设置饼图标签字体
			// Step 4: 渲染为 BufferedImage
			BufferedImage bufferedImage = pieChart.createBufferedImage(1200, 800);
			// Step 5: 将 BufferedImage 转换为字节数组
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			ImageIO.write(bufferedImage, "png", baos);
			byte[] imageBytes = baos.toByteArray();
			// Step 6: 将字节数组编码为 Base64 字符串
			base64Image = Base64.getEncoder().encodeToString(imageBytes);
			// 输出 Base64 字符串
			System.out.println("Base64 Image: " + base64Image);
			return base64Image;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return base64Image;
	}
```

## 示例2
resources/templates/pdf_sample.html
```
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8" />
    <title>PDF Export</title>
    <style>
        body {
            font-family: 'simsun', sans-serif;
        }
        .textBule {
            color: #597CBD;
        }
        .downImg {
            text-align: center;
        }
        .countDiv {
            text-align: center;
        }
        .countDiv .countDiv1 {
            font-size: 30px;
            font-weight: bold;
            margin-top: 5px;
        }
        .countDiv .countDiv2 {
            font-size: 16px;
            font-weight: bold;
            color: #92979B;
            margin-top: 5px;
        }
        .countDiv .countDiv3 {
            font-size: 12px;
            font-weight: bold;
            color: red;
            margin-top: 5px;
        }
        .countDiv .countDiv4 {
            font-size: 12px;
            font-weight: bold;
            color: #92979B;
            margin-top: 5px;
        }
        .container {
            /* display: flex; */
            height: 300px;
        }
        .left {
            /* flex: 1; */
            float: left;
            width: 50%;
        }
        
        .right {
            /* flex: 1; */
            float: left;
            width: 50%;
        }
        .progress-container {
            width: 50%;
            background-color: #e0e0e0; /* 进度条的背景颜色 */
            border-radius: 4px; /* 圆角边框 */
            overflow: hidden; /* 确保子元素不超出容器范围 */
            display: inline-block;
        }
            
        .progress-bar {
            height: 8px; /* 进度条的高度 */
            background-color: #557CC6; /* 进度条的颜色 */
            border-radius: 4px; /* 圆角边框 */
            transition: width 0.5s ease; /* 进度条变化时的动画效果 */
            text-align: center; /* 文字居中 */
            color: white; /* 文字颜色 */
            line-height: 20px; /* 文字垂直居中 */
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }
        tr:hover {
            background-color: #f5f5f5;
        }
    </style>
</head>
<body>
    <h1 style="text-align: center">安全周报</h1>
    <h3 style="text-align: center">7月22日-7月29日</h3>
    <h4>安全态势</h4>
    <h4 style="text-align: center">
        本期共发现本地设备<span class="textBule">20</span>台，原始攻击<span class="textBule">120</span>次
    </h4>
    <div class="downImg">
		<!-- <img src="down.png" alt="示例图片"/> -->
        <img th:src="${imageDown}" alt="示例图片" width="75"/>
    </div>
    <div class="countDiv">
		<div class="countDiv1">180次</div>
        <div class="countDiv2">勒索</div>
        <div class="countDiv3">2次 较上周</div>
        <div class="countDiv4">已处置100次</div>
    </div>
    <hr />
    <h4>安全事件</h4>
    <div class="container">
        <div class="left">
            <div>img base64 test:</div>
            <div class="image-container">
                <img th:src="${imagePath}" alt="示例图片" width="300"/>
            </div>
        </div>
        <div class="right">
            <div>
                进度条
                <div class="progress-container">
                    <div class="progress-bar" style="width: 75%;"></div>
                </div>
                76
            </div>
            <div>
                进度条
                <div class="progress-container">
                    <div class="progress-bar" style="width: 50%;"></div>
                </div>
                50
            </div>
        </div>
    </div>
    <hr />
    <h4>表格</h4>
    <table>
        <thead>
            <tr>
                <th>编号</th>
                <th>姓名</th>
                <th>年龄</th>
                <th>城市</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td>张三</td>
                <td>25</td>
                <td>北京</td>
            </tr>
            <tr>
                <td>2</td>
                <td>李四</td>
                <td>30</td>
                <td>上海</td>
            </tr>
            <tr>
                <td>3</td>
                <td>王五</td>
                <td>28</td>
                <td>广州</td>
            </tr>
        </tbody>
    </table>

    <h4>变量示例</h4>
    <p th:text="'用户姓名: ' + ${name}"></p>
    <p th:text="'当前时间: ' + ${currentDate}"></p>
</body>
</html>
```

PdfController
```
	@GetMapping("/test")
	public void test(HttpServletResponse response, Model model) throws IOException {
		// 设置响应类型为 PDF
		response.setContentType("application/pdf");
		response.setHeader("Content-Disposition", "attachment; filename=export.pdf");

		String imgDownPath = new ClassPathResource("templates/down.png").getFile().getAbsolutePath();
		// 填充模型数据
		model.addAttribute("name", "张三");
		model.addAttribute("currentDate", LocalDateTime.now());
		//model.addAttribute("imgPath", imgPath);
		// 图片路径，可以是绝对路径、相对路径或 base64 编码
		String base64ImageDown = "data:image/jpeg;base64," + encodeImageToBase64(imgDownPath);
		model.addAttribute("imageDown", base64ImageDown);
		model.addAttribute("imagePath", "data:image/jpeg;base64," + createPdfPie3());

		// 渲染 Thymeleaf 模板为 HTML 字符串
		Context context = new Context();
		context.setVariables(model.asMap());
		String htmlContent = templateEngine.process("pdf_sample", context);

		// 加载字体
		String fontPath = new ClassPathResource("fonts/SimSun.ttf").getFile().getAbsolutePath();
		// 将 HTML 转换为 PDF
		try (ByteArrayOutputStream os = new ByteArrayOutputStream()) {
			PdfRendererBuilder builder = new PdfRendererBuilder();
			builder.useFont(new FSSupplier<InputStream>() {
				@Override
				public InputStream supply() {
					try {
						return new FileInputStream(fontPath);
					} catch (FileNotFoundException e) {
						e.printStackTrace();
					}
					return null;
				}
			}, "simsun");
			builder.withHtmlContent(htmlContent, "");
			builder.toStream(os);
			builder.run();
			// 将 PDF 写入响应输出流
			response.getOutputStream().write(os.toByteArray());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
```
