const bcrypt = require("bcrypt")
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

async function seedDataBase() {
  try {
    console.log("🌱 Iniciando seed do banco de dados...")
    // USUÁRIOS
    console.log("👤 Criando usuários...")
    const adminUser = await prisma.user.upsert({
      where: { email: "wilson@corretor.com" },
      update: {},
      create: {
        name: "Wilson Corretor",
        email: "wilson@corretor.com",
        password: await bcrypt.hash("admin123", 12),
        role: "ADMIN",
        phone: "(11) 99999-9999",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        isActive: true,
      },
    })

    const clientUser = await prisma.user.upsert({
      where: { email: "cliente@teste.com" },
      update: {},
      create: {
        name: "Cliente Teste",
        email: "cliente@teste.com",
        password: await bcrypt.hash("cliente123", 12),
        role: "USER",
        phone: "(11) 88888-8888",
        isActive: true,
      },
    })

    // CLIENTES/DEPOIMENTOS
    console.log("🗣️ Criando clientes e depoimentos...")
    const customers = [
      {
        name: "Paulo Lima",
        testimonial:
          "Wilson foi extremamente atencioso e me ajudou a encontrar a casa dos meus sonhos. Recomendo a todos!",
        photo:
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1760038319/cliente2_uzirxw.jpg",
        rating: 5,
        occupation: "Professor",
        location: "Pouso Alegre, MG",
        isActive: true,
        order: 1,
      },
      {
        name: "João Santos",
        testimonial:
          "Vendeu meu apartamento rapidamente e pelo melhor preço. Recomendo a todos!",
        photo:
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1760038319/cliente1_z8qwld.jpg",
        rating: 16,
        occupation: "Engenheiro",
        location: "Pouso Alegre, MG",
        isActive: true,
        order: 2,
      },
      {
        name: "Ana Costa",
        testimonial:
          "Profissional dedicado e honesto. Me orientou em todo o processo de compra do meu primeiro imóvel.",
        photo:
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1760038319/cliente3_pmito6.jpg",
        rating: 5,
        occupation: "Designer",
        location: "Pouso Alegre, MG",
        isActive: true,
        order: 3,
      },
      {
        name: "José Almeida",
        testimonial:
          "Excelente atendimento! Wilson me ajudou a encontrar a casa dos meus sonhos. Profissional competente e muito atencioso.",
        photo:
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1760038319/cliente4_g657oe.jpg",
        rating: 7,
        occupation: "Advogado",
        location: "Pouso Alegre, MG",
        isActive: true,
        order: 4,
      },
    ]

    for (const customer of customers) {
      await prisma.customer.create({ data: customer })
    }

    // IMÓVEIS
    console.log("🏠 Criando imóveis...")
    const properties = [
      // Aqui você pode adicionar os imóveis reais da imobiliária
      // Exemplo de estrutura:
      // {
      //   title: "Título do Imóvel",
      //   description: "Descrição detalhada do imóvel...",
      //   address: "Endereço completo",
      //   number: "123",
      //   complement: "Apto 45", // opcional
      //   neighborhood: "Nome do Bairro",
      //   city: "Pouso Alegre",
      //   state: "MG",
      //   zipCode: "37550-000",
      //   price: 450000,
      //   area: 120,
      //   bedrooms: 3,
      //   bathrooms: 2,
      //   garageSpaces: 2,
      //   type: "CASA", // CASA, APARTAMENTO, CHACARA, TERRENO, COMERCIAL
      //   status: "ACTIVE", // ACTIVE, SOLD, RENTED
      //   imageUrls: [
      //     "URL_DA_IMAGEM_1",
      //     "URL_DA_IMAGEM_2",
      //     // ... mais imagens
      //   ],
      //   featured: false, // true para destacar na página inicial
      //   views: 0,
      //   slug: "titulo-do-imovel-sem-espacos", // único para cada imóvel
      //   latitude: null, // coordenadas GPS (opcional)
      //   longitude: null,
      //   createdById: adminUser.id,
      // },
    ]

    // Busca o maior codRef atual e inicia o contador (mínimo 999)
    const max = await prisma.property.aggregate({ _max: { codRef: true } })
    let codRefCounter = Math.max(max._max.codRef ?? 999, 999)

    const createdProperties = []
    for (const property of properties) {
      // Se já existe por slug, não cria novamente
      const existing = await prisma.property.findUnique({
        where: { slug: property.slug },
      })
      if (existing) {
        createdProperties.push(existing)
        continue
      }

      // Incrementa e garante início em 1000
      codRefCounter = Math.max(codRefCounter + 1, 1000)

      // Cria com codRef gerado
      const created = await prisma.property.create({
        data: { ...property, codRef: codRefCounter },
      })
      createdProperties.push(created)
    }

    // TAGS PARA BLOG
    console.log("🏷️ Criando tags...")
    const tags = [
      { name: "Dicas", slug: "dicas" },
      { name: "Mercado Imobiliário", slug: "mercado-imobiliario" },
      { name: "Financiamento", slug: "financiamento" },
      { name: "Primeiro Imóvel", slug: "primeiro-imovel" },
    ]

    const createdTags = []
    for (const tag of tags) {
      const created = await prisma.tag.upsert({
        where: { slug: tag.slug },
        create: tag,
        update: tag,
      })
      createdTags.push(created)
    }

    // ARTIGOS DO BLOG
    console.log("📝 Criando artigos...")
    const articles = [
      {
        title: "Dicas práticas para conquistar seu financiamento imobiliário",
        content: `# Dicas práticas para conquistar seu financiamento imobiliário

Realizar o sonho da casa própria é um dos grandes objetivos de muitas famílias brasileiras. Para grande parte dessas pessoas, o **financiamento imobiliário** é o caminho que torna esse sonho possível.

## 1. Organize suas finanças antes de buscar o financiamento

O primeiro passo para financiar um imóvel começa muito antes de ir ao banco: é entender sua realidade financeira. Analise sua renda mensal, gastos fixos e variáveis, e veja qual valor de parcela cabe no orçamento sem comprometer sua tranquilidade.

> Lembre-se que, na maioria das instituições, o comprometimento da renda não deve ultrapassar **30%**.

## 2. Prepare a documentação com antecedência

Ter toda a documentação pronta agiliza o processo e passa mais segurança para o banco. Normalmente, os principais documentos exigidos são:

- RG e CPF
- Comprovante de estado civil  
- Comprovantes de renda atualizados
- Declaração do Imposto de Renda
- Comprovante de residência

## 3. Pesquise as opções disponíveis

Cada banco ou instituição financeira oferece diferentes taxas de juros, prazos e condições. Antes de escolher, faça simulações em pelo menos três ou quatro instituições para comparar:

- Valor total financiado
- Taxas de juros (fixas ou variáveis)  
- Tempo de pagamento
- Custos adicionais (seguros obrigatórios, taxas administrativas)

## Conclusão

Conquistar um financiamento imobiliário não precisa ser complicado. Com planejamento, pesquisa e a ajuda de um profissional experiente, como um corretor de confiança, o processo se torna muito mais simples, seguro e vantajoso.

**Quer saber mais?** Continue acompanhando nosso blog e fique por dentro de outras dicas para realizar o sonho da casa própria de forma segura e inteligente!`,
        excerpt:
          "Dicas essenciais para encontrar a propriedade perfeita para você.",
        slug: "dicas-praticas-financiamento-imobiliario",
        imageUrl:
          "https://firebasestorage.googleapis.com/v0/b/wilson-corretor-imoveis.firebasestorage.app/o/articles_images%2F0d942540-d07e-476b-9bd9-4bfe6c0a4fec.jpg?alt=media&token=58b335e1-a9e1-4cf9-8e37-9b809aae4520",
        published: true,
        featured: true,
        views: 245,
        readTime: 5,
        metaTitle:
          "Dicas práticas para conquistar seu financiamento imobiliário - Guia completo",
        metaDescription:
          "Descubra as melhores dicas para escolher o imóvel perfeito para você e sua família.",
        keywords: ["imóvel", "compra", "dicas", "escolha"],
        publishedAt: new Date(),
        authorId: adminUser.id,
      },
      // Aritgo 2
      {
        title: "Panorama do mercado imobiliário em Pouso Alegre (MG)",
        content: `# Panorama do mercado imobiliário em Pouso Alegre (MG)

Localizada no coração do Sul de Minas Gerais, **Pouso Alegre** vem se consolidando como um dos municípios mais promissores para investimentos imobiliários no interior do Brasil.

## Crescimento populacional e desenvolvimento econômico

De acordo com dados do **Censo 2022 do IBGE**, Pouso Alegre alcançou a marca de aproximadamente **152 mil habitantes**, apresentando um crescimento populacional de 16,5% em relação a 2010.

## Infraestrutura robusta e novos investimentos

Um dos projetos de maior impacto na cidade é o **novo condomínio logístico** em construção no Distrito Industrial. Com previsão de investimentos que podem chegar a **R$ 1 bilhão**.

> **Fontes:**
> - [Diário do Comércio](https://diariodocomercio.com.br/economia/condominio-logistica-pouso-alegre-investimentos-industria/)
> - [Cemig RI](https://ri.cemig.com.br/docs/cemig-2025-04-09-fDcQH6Lz.pdf)

## Por que investir agora em Pouso Alegre?

- Crescimento populacional constante
- Infraestrutura moderna
- Localização estratégica no Sul de Minas
- Reconhecimento como polo industrial

**Entre em contato com a nossa equipe e descubra como investir no presente pode render ótimos frutos no futuro!**`,
        excerpt:
          "Crescimento, oportunidades e perspectivas para investidores na região de Pouso Alegre (MG)",
        slug: "panorama-mercado-imobiliario-pouso-alegre",
        imageUrl:
          "https://firebasestorage.googleapis.com/v0/b/wilson-corretor-imoveis.firebasestorage.app/o/articles_images%2F20541359-72a7-4f22-a39a-115e21e52143.jpg?alt=media&token=e40ec652-2c2e-4703-af4f-6803a5d55d39",
        published: true,
        featured: true,
        views: 245,
        readTime: 5,
        metaTitle: "Panorama do mercado imobiliário em Pouso Alegre (MG)",
        metaDescription:
          "Crescimento, oportunidades e perspectivas para investidores na região de Pouso Alegre (MG)",
        keywords: ["Pouso Alegre", "MG", "imobiliário", "investimento"],
        publishedAt: new Date(),
        authorId: adminUser.id,
      },
      // Aritgo 3
      {
        title: "Dicas essenciais para cuidar e valorizar seu patrimônio",
        content: `# Dicas essenciais para cuidar e valorizar seu patrimônio

Todo imóvel vai muito além de paredes e concreto: ele representa um patrimônio conquistado, segurança para a família e, muitas vezes, uma importante fonte de investimento.

## Manutenção preventiva

O primeiro passo para proteger esse patrimônio é investir em **manutenção preventiva**:

- Revisar instalações elétricas e hidráulicas
- Checar o telhado regularmente
- Limpar calhas
- Manter a pintura em dia

## Limpeza periódica

A **limpeza periódica** também é essencial para manter o imóvel saudável e bonito. Limpar regularmente não só valoriza a aparência, mas ajuda a combater mofo e preservar revestimentos.

## Pequenos reparos

Rachaduras, vazamentos ou infiltrações devem ser resolvidos assim que identificados. Adiar esses ajustes pode resultar em problemas estruturais.

## Áreas externas

- Aparar plantas
- Cuidar da drenagem  
- Limpar pisos
- Remover folhas acumuladas

**Gostou dessas dicas?** Fique de olho no blog para mais conteúdos!`,
        excerpt: "Dicas de manutenção que ajudam a valorizar seu imóvel",
        slug: "dicas-manutencao-valorizar-imovel",
        imageUrl:
          "https://firebasestorage.googleapis.com/v0/b/wilson-corretor-imoveis.firebasestorage.app/o/articles_images%2F311807b8-9256-4f49-a2aa-d0ab33511a38.jpg?alt=media&token=862e03c8-711b-47e9-a226-af27d4d9b324",
        published: true,
        featured: true,
        views: 245,
        readTime: 5,
        metaTitle: "Dicas de manutenção que ajudam a valorizar seu imóvel",
        metaDescription:
          "Dicas de manutenção que ajudam a valorizar seu imóvel",
        keywords: ["imóvel", "manutenção", "valorização"],
        publishedAt: new Date(),
        authorId: adminUser.id,
      },
      // Aritgo 4
      {
        title: "O Guia completo para vender seu imóvel de forma eficiente",
        content: `# O Guia completo para vender seu imóvel de forma eficiente

Vender um imóvel pode parecer simples, mas são muitos detalhes que fazem toda a diferença entre fechar negócio rápido e ver o imóvel parado por meses.

## 1. Conheça bem o seu imóvel e defina um preço justo

Avalie:
- Localização e infraestrutura do bairro
- Estado de conservação
- Área construída e terreno
- Diferenciais (vista, suíte, vaga extra)

## 2. Capriche na apresentação

A primeira impressão é decisiva:
- **Organize e limpe** bem todos os cômodos
- **Conserte** pequenos defeitos aparentes
- Valorize iluminação natural
- Contrate fotos profissionais

## 3. Divulgue de forma estratégica

- Publicar em portais imobiliários
- Usar boas fotos e descrição completa
- Explorar redes sociais e grupos regionais

## 4. Mantenha a documentação em dia

- Matrícula atualizada
- Certidões negativas
- Planta do imóvel

## 5. Conte com um corretor de confiança

**Wilson Santiago corretor imobiliário** é reconhecido por unir experiência, conhecimento do mercado local e atendimento próximo.

**Deseja saber mais?** Entre em contato com o **Wilson Santiago** e transforme seu imóvel em uma ótima oportunidade!`,
        excerpt: "O Guia completo para vender seu imóvel de forma eficiente",
        slug: "guia-completo-vender-imovel-eficiente",
        imageUrl:
          "https://firebasestorage.googleapis.com/v0/b/wilson-corretor-imoveis.firebasestorage.app/o/articles_images%2Fd76f9d37-7da2-4436-a0d0-fd72a521ac64.jpg?alt=media&token=566680db-5e7b-45e8-a7d0-d2594622da51",
        published: true,
        featured: true,
        views: 245,
        readTime: 5,
        metaTitle: "O Guia Completo para Vender seu Imóvel de Forma Eficiente",
        metaDescription:
          "O Guia Completo para Vender seu Imóvel de Forma Eficiente",
        keywords: ["imóvel", "venda", "eficiente"],
        publishedAt: new Date(),
        authorId: adminUser.id,
      },
    ]

    const createdArticles = []
    for (const article of articles) {
      const created = await prisma.article.upsert({
        where: { slug: article.slug },
        create: article,
        update: article,
      })
      createdArticles.push(created)
    }

    // ASSOCIAÇÕES ARTIGO-TAG (idempotente)
    if (createdArticles.length > 0 && createdTags.length > 0) {
      await prisma.articleTag.upsert({
        where: {
          articleId_tagId: {
            articleId: createdArticles[0].id,
            tagId: createdTags[0].id,
          },
        },
        create: {
          articleId: createdArticles[0].id,
          tagId: createdTags[0].id,
        },
        update: {},
      })
    }

    // CONTATOS
    console.log("📞 Criando contatos...")
    const contacts =
      createdProperties.length >= 2
        ? [
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
          ]
        : []

    for (const contact of contacts) {
      const exists = await prisma.contact.findFirst({
        where: { email: contact.email, message: contact.message },
      })
      if (!exists) {
        await prisma.contact.create({ data: contact })
      }
    }

    // FAVORITOS
    console.log("❤️ Criando favoritos...")
    if (createdProperties.length > 0) {
      await prisma.favorite.upsert({
        where: {
          userId_propertyId: {
            userId: clientUser.id,
            propertyId: createdProperties[0].id,
          },
        },
        create: {
          userId: clientUser.id,
          propertyId: createdProperties[0].id,
        },
        update: {},
      })
    }

    // CONFIGURAÇÕES DO SITE (upsert por key)
    console.log("⚙️ Criando configurações do site...")
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
    ]

    for (const config of siteConfigs) {
      await prisma.siteConfig.upsert({
        where: { key: config.key },
        create: config,
        update: config,
      })
    }

    console.log("✅ Seed concluído com sucesso!")
  } catch (error) {
    console.error("❌ Erro durante o seed:", error)
    throw error
  }
}

async function main() {
  await seedDataBase()
}

main()
  .catch((e) => {
    console.error("❌ Erro durante o seed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
