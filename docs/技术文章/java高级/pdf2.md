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
