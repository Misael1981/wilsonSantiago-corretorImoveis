const { PrismaClient } = require("../app/generated/prisma");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

async function seedDataBase() {
  try {
    console.log("🌱 Iniciando seed do banco de dados...");

    // BANNERS DO CAROUSEL
    console.log("🎠 Criando banners do carousel...");
    const carouselBanners = [
      {
        imageMobile:
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757192583/home1-mobile_jxw4j1.webp",
        imageTablet:
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757209138/home1-tablet_ytroy9.webp",
        imageDesktop:
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757250643/home1-desktop_tad3fl.webp",
        imageLaptop:
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757250927/home1-laptop_ey2npj.webp",
        title: "Escolha inteligente",
        description: "Escolha inteligente para sua obra.",
        order: 1,
        isActive: true,
      },
      {
        imageMobile:
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757192584/home2-mobile_vplauq.webp",
        imageTablet:
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757209138/home2-tablet_yxkdgv.webp",
        imageDesktop:
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757250643/home2-desktop_fgos64.webp",
        imageLaptop:
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757250928/home2-laptop_trdgjf.webp",
        title: "Economia e Qualidade",
        description: "Economia e Qualidade para sua obra.",
        order: 2,
        isActive: true,
      },
      {
        imageMobile:
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757192584/home3-mobile_tdab9a.webp",
        imageTablet:
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757209138/home3-tablet_qwlkkw.webp",
        imageDesktop:
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757250643/home3-desktop_vlcskx.webp",
        imageLaptop:
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757250929/home3-laptop_qiab08.webp",
        title: "Entrega em todo o Brasil",
        description: "Entregamos em todo pais.",
        order: 3,
        isActive: true,
      },
      {
        imageMobile:
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757192583/home4-mobile_kgx2az.webp",
        imageTablet:
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757209138/home4-tablet_n7wium.webp",
        imageDesktop:
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757250644/home4-desktop_rzkqjc.webp",
        imageLaptop:
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757250932/home4-laptop_togizf.webp",
        title: "Banner Principal",
        description: "Banner principal, outdoor.",
        order: 4,
        isActive: true,
      },
      {
        imageMobile:
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757192584/home5-mobile_mjcdb2.webp",
        imageTablet:
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757209139/home5-tablet_jbhmni.webp",
        imageDesktop:
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757250644/home5-desktop_owzuw6.webp",
        imageLaptop:
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757250932/home5-laptop_wnmhoc.webp",
        title: "Banner secundário",
        description: "Banner secundário, outdoor.",
        order: 5,
        isActive: true,
      },
    ];

    for (const banner of carouselBanners) {
      await prisma.carouselBanner.create({ data: banner });
    }

    // PRODUTOS
    console.log("📦 Criando produtos...");
    const products = [
      // CUNHA NIVELADORA SMART
      {
        name: "Cunha Niveladora Smart",
        slug: "cunha-smart",
        description:
          "A Cunha Niveladora com o auxílio do Espaçador Nivelador SSLARES garante o nivelamento correto dos pisos e mantém o espaçamento conforme a medida do espaçador. Com as duas funções simultâneas agiliza o processo de assentamento dos pisos, reduzindo em até 50% o tempo de colocação. A cunha Niveladora SSLARES é reutilizável.",
        type: "cunhas",
        tags: ["cunhas", "assentamento de pisos"],
        colors: [],
        brand: "SSLARES",
        price: 18.9,
        salePrice: 15.9,
        height: 20,
        width: 23,
        length: 84,
        weight: 0.05,
        imageUrl: [
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279794/cunha_hnksdf.png",
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279795/cunha3_tsolzy.png",
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279795/cunha4_s1flku.png",
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279794/cunha2_abcwuu.png",
        ],
        isAvailable: true,
        packaging: {
          create: [
            {
              quantityPerPackage: 50,
              packagePerBox: 20,
              unitLabel: "peças",
              price: 280.9,
              salePrice: 25.9,
              boxHeight: 40,
              boxWidth: 28,
              boxLength: 38,
              boxWeight: 6.65,
            },
            {
              quantityPerPackage: 200,
              packagePerBox: 5,
              unitLabel: "peças",
              price: 280.9,
              salePrice: 25.9,
              boxHeight: 40,
              boxWidth: 28,
              boxLength: 38,
              boxWeight: 6.395,
            },
          ],
        },
      },
      // CUNHA NIVELADORA SLIM
      {
        name: "Cunha Niveladora Slim",
        slug: "cunha-slim",
        description:
          "A Cunha Niveladora com o auxílio do Espaçador Nivelador SSLARES garante o nivelamento correto dos pisos e mantém o espaçamento conforme a medida do espaçador. Com as duas funções simultâneas agiliza o processo de assentamento dos pisos, reduzindo em até 50% o tempo de colocação. A cunha Niveladora SSLARES é reutilizável.",
        type: "cunhas",
        tags: ["cunhas", "assentamento de pisos"],
        colors: [],
        brand: "SSLARES",
        price: 18.9,
        height: 10,
        width: 14,
        length: 70,
        weight: 0.05,
        imageUrl: [
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279794/cunha_hnksdf.png",
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279795/cunha3_tsolzy.png",
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279795/cunha4_s1flku.png",
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279794/cunha2_abcwuu.png",
        ],
        isAvailable: true,
        packaging: {
          create: [
            {
              quantityPerPackage: 50,
              packagePerBox: 35,
              unitLabel: "peças",
              price: 280.9,
              salePrice: 25.9,
              boxHeight: 40,
              boxWidth: 28,
              boxLength: 38,
              boxWeight: 8.85,
            },
          ],
        },
      },
      // ESPAÇADOR SMART 1,0MM
      {
        name: "Espaçador Smart 1,0mm",
        slug: "espacador-smart-1-0mm",
        description:
          "O Espaçador Nivelador SSLARES garante espaçamento e auxilia a Cunha Niveladora Slim a nivelar os pisos corretamente. Com as duas funções simultâneas agiliza o processo de assentamento dos pisos, reduzindo em até 50% o tempo de colocação.",
        type: "espaçadores",
        tags: ["espacador", "assentamento de pisos", "nivelador de pisos"],
        brand: "SSLARES",
        price: 21.0,
        salePrice: 19.9,
        colors: [],
        height: 45,
        width: 30,
        length: 38,
        weight: 0.01,
        imageUrl: [
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279797/espacador-slim-padrao_gmvoav.png",
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279804/slim-secundaria-02_vn2jz0.png",
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279804/slim-secundaria-01_lam45d.png",
        ],
        isAvailable: true,
        packaging: {
          create: [
            {
              quantityPerPackage: 50,
              packagePerBox: 50,
              unitLabel: "peças",
              price: 200.0,
              boxHeight: 50,
              boxWidth: 45,
              boxLength: 40,
              boxWeight: 7.67,
            },
            {
              quantityPerPackage: 100,
              packagePerBox: 25,
              unitLabel: "peças",
              price: 200.0,
              boxHeight: 50,
              boxWidth: 45,
              boxLength: 40,
              boxWeight: 7.67,
            },
          ],
        },
      },
    ];

    for (const product of products) {
      await prisma.product.create({ data: product });
    }

    // USUÁRIOS
    console.log("👤 Criando usuários...");
    const adminUser = await prisma.user.create({
      data: {
        name: "Wilson Corretor",
        email: "wilson@corretor.com",
        password: await bcrypt.hash("admin123", 12),
        role: "ADMIN",
        phone: "(11) 99999-9999",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        isActive: true,
      },
    });

    const clientUser = await prisma.user.create({
      data: {
        name: "Cliente Teste",
        email: "cliente@teste.com",
        password: await bcrypt.hash("cliente123", 12),
        role: "USER",
        phone: "(11) 88888-8888",
        isActive: true,
      },
    });

    // CLIENTES/DEPOIMENTOS
    console.log("🗣️ Criando clientes e depoimentos...");
    const customers = [
      {
        name: "Maria Silva",
        testimonial:
          "Excelente atendimento! Wilson me ajudou a encontrar a casa dos meus sonhos. Profissional competente e muito atencioso.",
        photo:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        rating: 5,
        occupation: "Professora",
        location: "São Paulo, SP",
        isActive: true,
        order: 1,
      },
      {
        name: "João Santos",
        testimonial:
          "Vendeu meu apartamento rapidamente e pelo melhor preço. Recomendo a todos!",
        photo:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        rating: 5,
        occupation: "Engenheiro",
        location: "Campinas, SP",
        isActive: true,
        order: 2,
      },
      {
        name: "Ana Costa",
        testimonial:
          "Profissional dedicado e honesto. Me orientou em todo o processo de compra do meu primeiro imóvel.",
        photo:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        rating: 5,
        occupation: "Designer",
        location: "Santos, SP",
        isActive: true,
        order: 3,
      },
    ];

    for (const customer of customers) {
      await prisma.customer.create({ data: customer });
    }

    // IMÓVEIS
    console.log("🏠 Criando imóveis...");
    const properties = [
      {
        title: "Casa Moderna no Centro",
        description:
          "Linda casa moderna localizada no centro da cidade, com acabamentos de primeira qualidade e excelente localização.",
        address: "Rua das Flores, 123",
        neighborhood: "Centro",
        city: "São Paulo",
        state: "SP",
        zipCode: "01000-000",
        price: 450000,
        area: 250,
        bedrooms: 3,
        bathrooms: 2,
        garageSpaces: 2,
        type: "CASA",
        status: "ACTIVE",
        imageUrls: [
          "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop",
        ],
        featured: true,
        views: 150,
        slug: "casa-moderna-no-centro",
        latitude: -23.5505,
        longitude: -46.6333,
        createdById: adminUser.id,
      },
      {
        title: "Apartamento Cobertura",
        description:
          "Cobertura duplex com terraço gourmet e vista panorâmica da cidade.",
        address: "Av. Paulista, 1000",
        neighborhood: "Bela Vista",
        city: "São Paulo",
        state: "SP",
        zipCode: "01310-000",
        price: 850000,
        area: 180,
        bedrooms: 2,
        bathrooms: 2,
        garageSpaces: 1,
        type: "APARTAMENTO",
        status: "ACTIVE",
        imageUrls: [
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
        ],
        featured: true,
        views: 89,
        slug: "apartamento-cobertura-bela-vista",
        latitude: -23.5618,
        longitude: -46.6565,
        createdById: adminUser.id,
      },
    ];

    const createdProperties = [];
    for (const property of properties) {
      const created = await prisma.property.create({ data: property });
      createdProperties.push(created);
    }

    // TAGS PARA BLOG
    console.log("🏷️ Criando tags...");
    const tags = [
      { name: "Dicas", slug: "dicas" },
      { name: "Mercado Imobiliário", slug: "mercado-imobiliario" },
      { name: "Financiamento", slug: "financiamento" },
      { name: "Primeiro Imóvel", slug: "primeiro-imovel" },
    ];

    const createdTags = [];
    for (const tag of tags) {
      const created = await prisma.tag.create({ data: tag });
      createdTags.push(created);
    }

    // ARTIGOS DO BLOG
    console.log("📝 Criando artigos...");
    const articles = [
      {
        title: "Como escolher o imóvel ideal",
        content:
          "Conteúdo completo do artigo sobre como escolher o imóvel ideal...",
        excerpt:
          "Dicas essenciais para encontrar a propriedade perfeita para você.",
        slug: "como-escolher-imovel-ideal",
        imageUrl:
          "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop",
        published: true,
        featured: true,
        views: 245,
        readTime: 5,
        metaTitle: "Como escolher o imóvel ideal - Guia completo",
        metaDescription:
          "Descubra as melhores dicas para escolher o imóvel perfeito para você e sua família.",
        keywords: ["imóvel", "compra", "dicas", "escolha"],
        publishedAt: new Date(),
        authorId: adminUser.id,
      },
    ];

    const createdArticles = [];
    for (const article of articles) {
      const created = await prisma.article.create({ data: article });
      createdArticles.push(created);
    }

    // ASSOCIAÇÕES ARTIGO-TAG
    await prisma.articleTag.create({
      data: {
        articleId: createdArticles[0].id,
        tagId: createdTags[0].id,
      },
    });

    // CONTATOS
    console.log("📞 Criando contatos...");
    const contacts = [
      {
        name: "Pedro Silva",
        email: "pedro@email.com",
        phone: "(11) 99999-1111",
        message:
          "Gostaria de mais informações sobre o apartamento na Paulista.",
        type: "PROPERTY_INQUIRY",
        status: "PENDING",
        propertyId: createdProperties[1].id,
        assignedToId: adminUser.id,
      },
    ];

    for (const contact of contacts) {
      await prisma.contact.create({ data: contact });
    }

    // FAVORITOS
    console.log("❤️ Criando favoritos...");
    await prisma.favorite.create({
      data: {
        userId: clientUser.id,
        propertyId: createdProperties[0].id,
      },
    });

    // CONFIGURAÇÕES DO SITE
    console.log("⚙️ Criando configurações do site...");
    const siteConfigs = [
      {
        key: "site_name",
        value: "Wilson Corretor",
        type: "TEXT",
        description: "Nome do site",
      },
      {
        key: "site_description",
        value: "Seu corretor de confiança para compra e venda de imóveis",
        type: "TEXT",
        description: "Descrição do site",
      },
      {
        key: "contact_phone",
        value: "(11) 99999-9999",
        type: "TEXT",
        description: "Telefone de contato",
      },
      {
        key: "contact_email",
        value: "contato@wilsoncorretor.com",
        type: "TEXT",
        description: "Email de contato",
      },
      {
        key: "whatsapp_number",
        value: "5511999999999",
        type: "TEXT",
        description: "Número do WhatsApp",
      },
    ];

    for (const config of siteConfigs) {
      await prisma.siteConfig.create({ data: config });
    }

    console.log("✅ Seed concluído com sucesso!");
    console.log(`
📊 Dados criados:
- ${carouselBanners.length} banners do carousel
- ${products.length} produtos
- ${customers.length} clientes/depoimentos
- ${properties.length} imóveis
- ${tags.length} tags
- ${articles.length} artigos
- ${contacts.length} contatos/leads
- 1 favorito
- ${siteConfigs.length} configurações do site
- 2 usuários (admin e cliente)
    `);
  } catch (error) {
    console.error("❌ Erro durante o seed:", error);
    throw error;
  }
}

async function main() {
  await seedDataBase();
}

main()
  .catch((e) => {
    console.error("❌ Erro durante o seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
