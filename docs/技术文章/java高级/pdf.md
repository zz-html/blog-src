---
title: 'Pdf iText使用'
date: 2024-08-14 12:00:00
tags:
- 'SpringBoot'
- 'Pdf'
categories:
- 'java'
---
官方地址：https://kb.itextpdf.com/  
准备工作：  
搭建springboot工程  
下载中文字体包simsun.ttf，放在工程resources/fonts目录

## 包引用
引入PDF包。
```
    <dependency>
        <groupId>com.itextpdf</groupId>
        <artifactId>itext7-core</artifactId>
        <version>7.2.0</version>
        <type>pom</type>
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

## 简单示例
```
@RestController
@RequestMapping("/pdf")
public class PdfController {

    @GetMapping("/test")
    public ResponseEntity<byte[]> test() {
        try {
			byte[] pdfContent = createPdfText();

			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.APPLICATION_PDF);
			headers.setContentDispositionFormData("attachment", "sample.pdf");
			return new ResponseEntity<>(pdfContent, headers, HttpStatus.OK);
		} catch (IOException e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	private byte[] createPdfText() throws IOException {
		ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
		PdfWriter writer = new PdfWriter(byteArrayOutputStream);
		PdfDocument pdf = new PdfDocument(writer);
		Document document = new Document(pdf);

		String fontPath = new ClassPathResource("fonts/SimSun.ttf").getFile().getAbsolutePath();
		PdfFont font = PdfFontFactory.createFont(fontPath);
		document.add(new Paragraph("你好 World!").setFont(font).setFontSize(12));

		document.close();
		return byteArrayOutputStream.toByteArray();
	}
}
```

## 表格示例
```
	public byte[] createPdfTable() throws IOException {
		ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
		PdfWriter writer = new PdfWriter(byteArrayOutputStream);
		PdfDocument pdf = new PdfDocument(writer);
		Document document = new Document(pdf);

		String fontPath = new ClassPathResource("fonts/SimSun.ttf").getFile().getAbsolutePath();
		PdfFont font = PdfFontFactory.createFont(fontPath);

		document.add(new Paragraph("表格示例").setFont(font).setFontSize(12));
		float[] columnWidths = {1, 2, 2};
		Table table = new Table(columnWidths);
		table.addHeaderCell(new Cell().add(new Paragraph("ID").setFont(font)));
		table.addHeaderCell(new Cell().add(new Paragraph("姓名").setFont(font)));
		table.addHeaderCell(new Cell().add(new Paragraph("描述").setFont(font)));
		for (int i = 1; i <= 5; i++) {
			table.addCell(new Cell().add(new Paragraph(String.valueOf(i))));
			table.addCell(new Cell().add(new Paragraph("Item " + i)));
			table.addCell(new Cell().add(new Paragraph("Item " + i + " description.")));
		}
		document.add(table);

		document.close();
		return byteArrayOutputStream.toByteArray();
	}
```

## 饼图示例
```
	private byte[] createPdfPie() throws IOException {
		ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
		PdfWriter writer = new PdfWriter(byteArrayOutputStream);
		PdfDocument pdf = new PdfDocument(writer);
		Document document = new Document(pdf);

		String fontPath = new ClassPathResource("fonts/SimSun.ttf").getFile().getAbsolutePath();
		PdfFont font = PdfFontFactory.createFont(fontPath);
		document.add(new Paragraph("饼图示例").setFont(font).setFontSize(12));
		// 创建饼图数据集
		DefaultPieDataset dataset = new DefaultPieDataset();
		dataset.setValue("分类 A", 40);
		dataset.setValue("分类 B", 30);
		dataset.setValue("分类 C", 20);
		dataset.setValue("分类 D", 10);
		// 创建饼图
		JFreeChart pieChart = ChartFactory.createPieChart(
			"饼图 Test",   // 图表标题
			dataset,               // 数据集
			true,                  // 是否显示图例
			true,                  // 是否使用工具提示
			false                  // 是否生成URL
		);
		// 设置标题字体
		pieChart.getTitle().setFont(new Font("SimSun", Font.BOLD, 20));
		// 设置图例字体
		pieChart.getLegend().setItemFont(new Font("SimSun", Font.PLAIN, 12));
		// 设置饼图样式
		PiePlot plot = (PiePlot) pieChart.getPlot();
		plot.setSectionOutlinesVisible(false);
		plot.setLabelFont(new Font("SimSun", Font.PLAIN, 12));

		// 将饼图渲染为图像
		ByteArrayOutputStream chartOutputStream = new ByteArrayOutputStream();
		ChartUtils.writeChartAsPNG(chartOutputStream, pieChart, 500, 400);
		ImageData imageData = ImageDataFactory.create(chartOutputStream.toByteArray());

		// 将图像添加到PDF文档中
		Image chartImage = new Image(imageData);
		document.add(chartImage);

		document.close();
		return byteArrayOutputStream.toByteArray();
	}
```

## 折线图示例
```
	private byte[] createPdfLine() throws IOException {
		ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
		PdfWriter writer = new PdfWriter(byteArrayOutputStream);
		PdfDocument pdf = new PdfDocument(writer);
		Document document = new Document(pdf);

		String fontPath = new ClassPathResource("fonts/SimSun.ttf").getFile().getAbsolutePath();
		PdfFont font = PdfFontFactory.createFont(fontPath);
		document.add(new Paragraph("折线图示例").setFont(font).setFontSize(12));

		// 创建数据集
		XYSeries series = new XYSeries("销量");
		series.add(0, 200);
		series.add(1, 300);
		series.add(2, 400);
		series.add(3, 500);
		series.add(4, 600);
		XYSeriesCollection dataset = new XYSeriesCollection(series);
		// 创建折线图
		JFreeChart lineChart = ChartFactory.createXYLineChart(
				"月度销售量", // 图表标题
				"月份",       // x轴标签
				"销售额",     // y轴标签
				dataset,      // 数据集
				PlotOrientation.VERTICAL,
				true,         // 是否显示图例
				true,         // 是否使用工具提示
				false         // 是否生成 URL
		);
		// 设置标题字体
		lineChart.getTitle().setFont(new Font("SimSun", Font.BOLD, 20));
		// 设置图例字体
		lineChart.getLegend().setItemFont(new Font("SimSun", Font.PLAIN, 12));
		// 获取绘图区并设置字体
		XYPlot plot = lineChart.getXYPlot();
		plot.getDomainAxis().setLabelFont(new Font("SimSun", Font.PLAIN, 12)); // x轴
		plot.getRangeAxis().setLabelFont(new Font("SimSun", Font.PLAIN, 12));  // y轴
		plot.getDomainAxis().setTickLabelFont(new Font("SimSun", Font.PLAIN, 10)); // x轴刻度
		plot.getRangeAxis().setTickLabelFont(new Font("SimSun", Font.PLAIN, 10));  // y轴刻度

		// 设置横坐标标签
		String[] months = {"1月", "2月", "3月", "4月", "5月"};
		SymbolAxis xAxis = new SymbolAxis("月份", months);
		xAxis.setTickLabelFont(new Font("SimSun", Font.PLAIN, 12)); // 设置字体
		plot.setDomainAxis(xAxis);

		// 将折线图渲染为图像
		ByteArrayOutputStream chartOutputStream = new ByteArrayOutputStream();
		ChartUtils.writeChartAsPNG(chartOutputStream, lineChart, 500, 400);
		ImageData imageData = ImageDataFactory.create(chartOutputStream.toByteArray());

		// 将图像添加到 PDF 文档中
		Image chartImage = new Image(imageData);
		document.add(chartImage);

		document.close();
		return byteArrayOutputStream.toByteArray();
	}
```

## 综合示例
```
	private byte[] createPdfDemo() throws IOException {
		ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
		PdfWriter writer = new PdfWriter(byteArrayOutputStream);
		PdfDocument pdf = new PdfDocument(writer);
		Document document = new Document(pdf);

		String fontPath = new ClassPathResource("fonts/SimSun.ttf").getFile().getAbsolutePath();
		PdfFont font = PdfFontFactory.createFont(fontPath);
		document.add(new Paragraph("综合示例:").setFont(font).setFontSize(12));

		// 创建第一个饼图的数据集
		DefaultPieDataset dataset1 = new DefaultPieDataset();
		dataset1.setValue("在线(40)", 40);
		dataset1.setValue("离线(60)", 60);

		// 创建第二个饼图的数据集
		DefaultPieDataset dataset2 = new DefaultPieDataset();
		dataset2.setValue("授权正常(50)", 50);
		dataset2.setValue("部分过期(20)", 20);
		dataset2.setValue("已过期(30)", 30);

		// 创建饼图
		JFreeChart pieChart1 = ChartFactory.createPieChart(
				"设备状态", dataset1, true, true, false);
		JFreeChart pieChart2 = ChartFactory.createPieChart(
				"授权状态", dataset2, true, true, false);

		// 设置中文字体
		setPieChartChineseFont(pieChart1);
		setPieChartChineseFont(pieChart2);

		// 将饼图渲染为图像
		ByteArrayOutputStream chartOutputStream1 = new ByteArrayOutputStream();
		ByteArrayOutputStream chartOutputStream2 = new ByteArrayOutputStream();
		ChartUtils.writeChartAsPNG(chartOutputStream1, pieChart1, 250, 250);
		ChartUtils.writeChartAsPNG(chartOutputStream2, pieChart2, 250, 250);
		ImageData imageData1 = ImageDataFactory.create(chartOutputStream1.toByteArray());
		ImageData imageData2 = ImageDataFactory.create(chartOutputStream2.toByteArray());

		// 创建一个表格，将两个饼图放在同一行
		Table pieTable = new Table(2); // 两列表格
		pieTable.addCell(new Image(imageData1));
		pieTable.addCell(new Image(imageData2));
		// 将表格添加到文档中
		document.add(pieTable);

		Paragraph paragraph = new Paragraph().setFont(font).setFontSize(12);
		paragraph.add("数据统计: 2024年1-6月");
		document.add(paragraph);
		// 创建数据集用于折线图
		XYSeries series = new XYSeries("销量");
		series.add(0, 200);  // "1月"
		series.add(1, 300);  // "2月"
		series.add(2, 400);  // "3月"
		series.add(3, 500);  // "4月"
		series.add(4, 600);  // "5月"
		series.add(5, 600);  // "6月"
		XYSeriesCollection dataset = new XYSeriesCollection(series);

		// 创建折线图
		JFreeChart lineChart = ChartFactory.createXYLineChart(
				"月度销售量", // 图表标题
				"月份",       // x轴标签
				"销售额",     // y轴标签
				dataset,      // 数据集
				PlotOrientation.VERTICAL,
				true,         // 是否显示图例
				true,         // 是否使用工具提示
				false         // 是否生成 URL
		);

		// 获取绘图区并设置字体
		XYPlot plot = lineChart.getXYPlot();
		String[] months = {"1月", "2月", "3月", "4月", "5月", "6月"};
		SymbolAxis xAxis = new SymbolAxis("月份", months);
		xAxis.setTickLabelFont(new Font("SimSun", Font.PLAIN, 12)); // 设置字体
		plot.setDomainAxis(xAxis);

		NumberAxis yAxis = new NumberAxis("销售额");
		yAxis.setTickLabelFont(new Font("SimSun", Font.PLAIN, 12));
		plot.setRangeAxis(yAxis);

		lineChart.getTitle().setFont(new Font("SimSun", Font.BOLD, 20));  // 设置标题字体
		lineChart.getLegend().setItemFont(new Font("SimSun", Font.PLAIN, 12)); // 设置图例字体
		// 将折线图渲染为图像
		ByteArrayOutputStream chartOutputStream = new ByteArrayOutputStream();
		ChartUtils.writeChartAsPNG(chartOutputStream, lineChart, 250, 250);
		ImageData chartImageData = ImageDataFactory.create(chartOutputStream.toByteArray());
		Image chartImage = new Image(chartImageData);
		// 创建表格
		float[] columnWidths = {1, 2, 2};
		Table tableData = new Table(columnWidths);
		tableData.setWidth(250);
		tableData.addHeaderCell(new Cell().add(new Paragraph("ID").setFont(font)));
		tableData.addHeaderCell(new Cell().add(new Paragraph("月份").setFont(font)));
		tableData.addHeaderCell(new Cell().add(new Paragraph("销售额").setFont(font)));
		for (int i = 1; i <= 6; i++) {
			tableData.addCell(new Cell().add(new Paragraph(String.valueOf(i)).setFont(font)));
			tableData.addCell(new Cell().add(new Paragraph(i + "月").setFont(font)));
			tableData.addCell(new Cell().add(new Paragraph("Item " + i + " description.").setFont(font)));
		}
		// 将折线图和表格放在同一行中
		Table containerTable = new Table(2);
		containerTable.addCell(new Cell().add(chartImage).setBorder(null));  // 折线图放在左边
		containerTable.addCell(new Cell().add(tableData).setBorder(null));       // 表格放在右边
		// 将容器表格添加到文档中
		document.add(containerTable);

		document.close();
		return byteArrayOutputStream.toByteArray();
	}

	private static void setPieChartChineseFont(JFreeChart chart) {
		// 获取饼图的绘图对象
		PiePlot plot = (PiePlot) chart.getPlot();
		// 设置饼图标题字体和图例字体（如需要）
		chart.getTitle().setFont(new java.awt.Font("SimSun", java.awt.Font.BOLD, 20));
		chart.getLegend().setItemFont(new java.awt.Font("SimSun", java.awt.Font.PLAIN, 10));
		// 设置标签字体
		plot.setLabelFont(new java.awt.Font("SimSun", java.awt.Font.PLAIN, 10));
	}
```