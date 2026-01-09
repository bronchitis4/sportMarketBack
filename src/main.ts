import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cookieParser from 'cookie-parser';

async function start() {
    const PORT = process.env.PORT || 3000;
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin: [
            'http://localhost:5173',
            'http://localhost:3000',
            'https://sportmarketfront.onrender.com/',
            process.env.FRONTEND_URL
        ].filter(Boolean),
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });
    
    const cookieParserFn = (cookieParser as any).default || cookieParser;
    app.use(cookieParserFn());

    const config = new DocumentBuilder()
        .setTitle("Sport-market")
        .setDescription("Student project")
        .setVersion('1.0.0')
        .build();

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api/docs', app, document);

    await app.listen(PORT, () => {
        console.log(`Service is running on port ${PORT}`);
    });
}

start();
