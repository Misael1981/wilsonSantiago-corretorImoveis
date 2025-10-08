const { PrismaClient } = require("../app/generated/prisma")
const bcrypt = require("bcrypt")
const prisma = new PrismaClient()

async function seedDataBase() {
  try {
    console.log("🌱 Iniciando seed do banco de dados...")
    // USUÁRIOS
    console.log("👤 Criando usuários...")
    const adminUser = await prisma.user.create({
      data: {
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

    const clientUser = await prisma.user.create({
      data: {
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
    ]

    for (const customer of customers) {
      await prisma.customer.create({ data: customer })
    }

    // IMÓVEIS
    console.log("🏠 Criando imóveis...")
    const properties = [
      // CASA Parque Real
      {
        title: "Casa Parque Real",
        description:
          "Descubra esta linda casa com 3 dormitórios, sendo 1 suíte , perfeita para sua família. imóvel de uma sala aconchegante , cozinha funcional , lavanderia prática e garagem para 2 carros . Construída em um terreno de 200m² com 130m² de área construída , esta casa oferece o espaço ideal para o seu bem-estar.",
        address: "Sem endereço",
        number: "N/A",
        neighborhood: "CentroParque Real",
        city: "Pouso Alegre",
        state: "MG",
        zipCode: "N/A",
        price: 479000,
        area: 130,
        bedrooms: 2,
        bathrooms: 3,
        garageSpaces: 2,
        type: "CASA",
        status: "ACTIVE",
        imageUrls: [
          "https://firebasestorage.googleapis.com/v0/b/wilson-corretor-imoveis.firebasestorage.app/o/properties%2F1753454935508_cs-01.jpg?alt=media&token=c3d48111-6a68-41ce-b587-4317c7bd08ae",
          "https://firebasestorage.googleapis.com/v0/b/wilson-corretor-imoveis.firebasestorage.app/o/properties%2F1753454938521_cs-02.jpg?alt=media&token=217510e3-5c93-4d03-beaf-5612365db97f",

          "https://firebasestorage.googleapis.com/v0/b/wilson-corretor-imoveis.firebasestorage.app/o/properties%2F1753454942684_cs-04.jpg?alt=media&token=b2a3da76-5895-41cb-9ecf-767c5d9f3ae8",

          "https://firebasestorage.googleapis.com/v0/b/wilson-corretor-imoveis.firebasestorage.app/o/properties%2F1753454943492_cs-05.jpg?alt=media&token=490cebdb-c5e0-4af9-a457-1f9f5a9cf627",

          "https://firebasestorage.googleapis.com/v0/b/wilson-corretor-imoveis.firebasestorage.app/o/properties%2F1753454945528_cs-06.jpg?alt=media&token=e94afec4-32be-4603-8cee-bd979c45de01",

          "https://firebasestorage.googleapis.com/v0/b/wilson-corretor-imoveis.firebasestorage.app/o/properties%2F1753454947409_cs-07.jpg?alt=media&token=248ae564-d189-460e-a6af-0e50e9561478",

          "https://firebasestorage.googleapis.com/v0/b/wilson-corretor-imoveis.firebasestorage.app/o/properties%2F1753454948283_cs-08.jpg?alt=media&token=b56d2770-c846-4869-ac01-c07b5b07653c",
        ],
        featured: true,
        views: 150,
        slug: "casa-moderna-no-parque-real",
        latitude: null,
        longitude: null,
        createdById: adminUser.id,
      },
      // CASA Bela Itália
      {
        title: "Casa Bela Itália",
        description:
          "Casa Nova e Aconchegante no Bela Itália - Pouso Alegre/MG! Procurando seu novo lar? Esta casa no Bairro Bela Itália é perfeita para você! Com 3 quartos, sendo 1 suíte, além de um banheiro social, oferece conforto para toda a família. A sala e cozinha americana criam um ambiente moderno e integrado, ideal para o dia a dia. Conta ainda com área de serviço e duas vagas de garagem (uma coberta e uma descoberta). Com 90m² de área construída em um terreno de 162m², esta casa é a oportunidade que você esperava!",
        address: "Sem endereço",
        number: "N/A",
        neighborhood: "Bela Itália",
        city: "Pouso Alegre",
        state: "MG",
        zipCode: "N/A",
        price: 350000,
        area: 161.98,
        bedrooms: 3,
        bathrooms: 1,
        garageSpaces: 2,
        type: "CASA",
        status: "ACTIVE",
        imageUrls: [
          "https://firebasestorage.googleapis.com/v0/b/wilson-corretor-imoveis.firebasestorage.app/o/properties%2F1753491125352_cs-01.jpg?alt=media&token=e913314e-ccce-420c-ab9d-efc70b68108f",

          "https://firebasestorage.googleapis.com/v0/b/wilson-corretor-imoveis.firebasestorage.app/o/properties%2F1753491127978_cs-02.jpg?alt=media&token=09bfbae8-f8ee-4c60-841a-62ee2749e4cb",

          "https://firebasestorage.googleapis.com/v0/b/wilson-corretor-imoveis.firebasestorage.app/o/properties%2F1753491130058_cs-03.jpg?alt=media&token=1b5f0019-1a1c-4746-9af8-e153a4c8689d",

          "https://firebasestorage.googleapis.com/v0/b/wilson-corretor-imoveis.firebasestorage.app/o/properties%2F1753491132288_cs-04.jpg?alt=media&token=15680da1-c0d6-4162-b76b-5fe7afc9c902",

          "https://firebasestorage.googleapis.com/v0/b/wilson-corretor-imoveis.firebasestorage.app/o/properties%2F1753491134267_cs-05.jpg?alt=media&token=29403cc7-073a-4d22-aa7b-575162bcc430",

          "https://firebasestorage.googleapis.com/v0/b/wilson-corretor-imoveis.firebasestorage.app/o/properties%2F1753491135035_cs-06.jpg?alt=media&token=30e12707-a0d1-4592-b4f1-ff2086ab3b07",

          "https://firebasestorage.googleapis.com/v0/b/wilson-corretor-imoveis.firebasestorage.app/o/properties%2F1753491135978_cs-07.jpg?alt=media&token=966aa509-62aa-403c-a9b6-4add4698868b",

          "https://firebasestorage.googleapis.com/v0/b/wilson-corretor-imoveis.firebasestorage.app/o/properties%2F1753491137638_cs-08.jpg?alt=media&token=00105114-4a82-4218-8dc1-5808d1ef0bf7",

          "https://firebasestorage.googleapis.com/v0/b/wilson-corretor-imoveis.firebasestorage.app/o/properties%2F1753491139306_cs-09.jpg?alt=media&token=94d95790-f4be-428a-be55-241adbf5deb2",
        ],
        featured: true,
        views: 150,
        slug: "casa-bela-italia",
        latitude: null,
        longitude: null,
        createdById: adminUser.id,
      },
      // Chácara
      {
        title: "Chácara Bairro Cajuru",
        description:
          "Sua busca pela chácara perfeita acaba aqui! Localizada no bairro Cajuru, com acesso por estrada asfaltada e toda murada, garantindo segurança e privacidade. A casa conta com 4 quartos, 2 banheiros, sala e cozinha. O destaque fica para a área de lazer completa com churrasqueira e piscina, perfeita para relaxar e receber amigos. Desfrute ainda de um pomar cheio de vida. Uma oportunidade incrível para morar ou ter seu refúgio de fim de semana!",
        address: "Sem endereço",
        number: "N/A",
        neighborhood: "Bairro Cajuru",
        city: "Pouso Alegre",
        state: "MG",
        zipCode: "N/A",
        price: 420000,
        area: null,
        bedrooms: 4,
        bathrooms: 2,
        garageSpaces: 2,
        type: "CHACARA",
        status: "ACTIVE",
        imageUrls: [
          "https://firebasestorage.googleapis.com/v0/b/wilson-corretor-imoveis.firebasestorage.app/o/properties%2F1753528466640_cs-01.jpg?alt=media&token=653b2956-0f94-4b5b-acee-7d12109275f0",

          "https://firebasestorage.googleapis.com/v0/b/wilson-corretor-imoveis.firebasestorage.app/o/properties%2F1753528469227_cs-02.jpg?alt=media&token=6d22257f-8f37-4af9-98ae-aafa958e8068",

          "https://firebasestorage.googleapis.com/v0/b/wilson-corretor-imoveis.firebasestorage.app/o/properties%2F1753528471271_cs-03.jpg?alt=media&token=59775033-372f-45e1-b7d6-279a5d799126",

          "https://firebasestorage.googleapis.com/v0/b/wilson-corretor-imoveis.firebasestorage.app/o/properties%2F1753528473076_cs-04.jpg?alt=media&token=3a59c2b5-4e27-41bb-90fd-d7d2f8dfe0bd",

          "https://firebasestorage.googleapis.com/v0/b/wilson-corretor-imoveis.firebasestorage.app/o/properties%2F1753528475099_cs-05.jpg?alt=media&token=351dcfbc-2d36-45dc-8e3d-062ff3d40c9a",

          "https://firebasestorage.googleapis.com/v0/b/wilson-corretor-imoveis.firebasestorage.app/o/properties%2F1753528476798_cs-06.jpg?alt=media&token=196b6dad-9955-444e-985c-8a183bc1b74b",

          "https://firebasestorage.googleapis.com/v0/b/wilson-corretor-imoveis.firebasestorage.app/o/properties%2F1753528478922_cs-07.jpg?alt=media&token=5d0088d3-bcf9-4c7f-bfaf-09459c50c40e",

          "https://firebasestorage.googleapis.com/v0/b/wilson-corretor-imoveis.firebasestorage.app/o/properties%2F1753528480619_cs-08.jpg?alt=media&token=99311e56-4b73-4643-b364-7a93563efcf7",

          "https://firebasestorage.googleapis.com/v0/b/wilson-corretor-imoveis.firebasestorage.app/o/properties%2F1753528482433_cs-09.jpg?alt=media&token=d43a64f5-2fef-434f-a243-5e95114ca14c",

          "https://firebasestorage.googleapis.com/v0/b/wilson-corretor-imoveis.firebasestorage.app/o/properties%2F1753528484405_cs-10.jpg?alt=media&token=f500b4ed-ca7a-4370-b3a6-9d2de0ee4870",

          "https://firebasestorage.googleapis.com/v0/b/wilson-corretor-imoveis.firebasestorage.app/o/properties%2F1753528486140_cs-11.jpg?alt=media&token=9587eec5-4bb8-434c-81ac-38752adf3910",

          "https://firebasestorage.googleapis.com/v0/b/wilson-corretor-imoveis.firebasestorage.app/o/properties%2F1753528488391_cs-12.jpg?alt=media&token=c5310609-ddb5-403f-924b-3de2e399bee3",

          "https://firebasestorage.googleapis.com/v0/b/wilson-corretor-imoveis.firebasestorage.app/o/properties%2F1753528490134_cs-13.jpg?alt=media&token=f1c52c01-d857-4512-b87f-a2c1fa54949c",

          "https://firebasestorage.googleapis.com/v0/b/wilson-corretor-imoveis.firebasestorage.app/o/properties%2F1753528491740_cs-14.jpg?alt=media&token=ce29eef6-5fdb-4ce7-8f3c-6595197be401",

          "https://firebasestorage.googleapis.com/v0/b/wilson-corretor-imoveis.firebasestorage.app/o/properties%2F1753528493494_cs-15.jpg?alt=media&token=0f323967-79f5-4905-95c8-c666f89a8800",

          "https://firebasestorage.googleapis.com/v0/b/wilson-corretor-imoveis.firebasestorage.app/o/properties%2F1753528495180_cs-16.jpg?alt=media&token=082ab7aa-d95d-4d6f-9370-5a1685d9892a",
        ],
        featured: true,
        views: 150,
        slug: "chacara-bairro-cajuru",
        latitude: null,
        longitude: null,
        createdById: adminUser.id,
      },
      // Apartamento no Santa Rita II
      {
        title: "Apartamento no Santa Rita II",
        description:
          "Apartamento com 75m² no Santa Rita II - Pouso Alegre/MG! Excelente oportunidade de morar no Santa Rita II, em Pouso Alegre! Este apartamento espaçoso de 75m² oferece 2 quartos, sala com sacada, cozinha ampla e lavanderia separada. Conta ainda com banheiro social e garagem coberta. Com uma localização privilegiada, fica ao lado da CIMED e de frente para o Fórum da Justiça do Trabalho, garantindo praticidade e fácil acesso.",
        address: "Sem endereço",
        number: "N/A",
        neighborhood: "Santa Rita II",
        city: "Pouso Alegre",
        state: "MG",
        zipCode: "N/A",
        price: 420000,
        area: 75,
        bedrooms: 2,
        bathrooms: 1,
        garageSpaces: 1,
        type: "APARTAMENTO",
        status: "ACTIVE",
        imageUrls: [
          "https://firebasestorage.googleapis.com/v0/b/wilson-corretor-imoveis.firebasestorage.app/o/properties%2F1753529412676_ap-01.jpg?alt=media&token=9b186192-bfad-49b0-ae0f-a0a73ed36220",

          "https://firebasestorage.googleapis.com/v0/b/wilson-corretor-imoveis.firebasestorage.app/o/properties%2F1753529415594_ap-02.jpg?alt=media&token=e1f9cb55-d2ad-47b9-92c3-93c536627b93",

          "https://firebasestorage.googleapis.com/v0/b/wilson-corretor-imoveis.firebasestorage.app/o/properties%2F1753529417936_ap-03.jpg?alt=media&token=9b9da8ea-4d39-4d15-a153-806c799f3c3d",

          "https://firebasestorage.googleapis.com/v0/b/wilson-corretor-imoveis.firebasestorage.app/o/properties%2F1753529419008_ap-04.jpg?alt=media&token=e824fa9d-e639-4afe-82e0-863d487b97be",

          "https://firebasestorage.googleapis.com/v0/b/wilson-corretor-imoveis.firebasestorage.app/o/properties%2F1753529420656_ap-05.jpg?alt=media&token=ace91be0-6a39-40a1-af58-a9f9d6cae4ba",

          "https://firebasestorage.googleapis.com/v0/b/wilson-corretor-imoveis.firebasestorage.app/o/properties%2F1753529421459_ap-06.jpg?alt=media&token=599b4739-bd70-4350-9deb-c39d230fccc5",

          "https://firebasestorage.googleapis.com/v0/b/wilson-corretor-imoveis.firebasestorage.app/o/properties%2F1753529422314_ap-07.jpg?alt=media&token=3a6255cf-5b90-48ce-b6a8-5ffb7c99ccdc",

          "https://firebasestorage.googleapis.com/v0/b/wilson-corretor-imoveis.firebasestorage.app/o/properties%2F1753529423047_ap-08.jpg?alt=media&token=21d34fda-73a2-441a-9758-0e68c980863f",

          "https://firebasestorage.googleapis.com/v0/b/wilson-corretor-imoveis.firebasestorage.app/o/properties%2F1753529424074_ap-09.jpg?alt=media&token=32a4998a-b660-4fb7-97e3-9f368d782dbc",

          "https://firebasestorage.googleapis.com/v0/b/wilson-corretor-imoveis.firebasestorage.app/o/properties%2F1753529424999_ap-10.jpg?alt=media&token=e719e4da-284f-4ed7-b208-c5fe8f323e90",

          "https://firebasestorage.googleapis.com/v0/b/wilson-corretor-imoveis.firebasestorage.app/o/properties%2F1753529426001_ap-11.jpg?alt=media&token=8bb1ddfc-f53b-40a0-bc62-45f6cab90195",

          "https://firebasestorage.googleapis.com/v0/b/wilson-corretor-imoveis.firebasestorage.app/o/properties%2F1753529426843_ap-12.jpg?alt=media&token=61b314c9-a94f-4145-bf1a-7f88abb1aff0",

          "https://firebasestorage.googleapis.com/v0/b/wilson-corretor-imoveis.firebasestorage.app/o/properties%2F1753529428752_ap-13.jpg?alt=media&token=68961e53-c854-4066-b902-6ead5fd09594",
        ],
        featured: true,
        views: 150,
        slug: "apartamento-santa-rita-2",
        latitude: null,
        longitude: null,
        createdById: adminUser.id,
      },
      // Casa Com Potencial Comercial
      {
        title: "Casa Com Potencial Comercial",
        description:
          "Excelente oportunidade em uma das avenidas mais valorizadas de Pouso Alegre! Esta casa é ideal para clínica ou consultório, devido à sua localização estratégica próxima ao Hospital Samuel Libâneo, Faculdade de Medicina Univás e fácil acesso ao Centro. Com 300m² de lote e 290m² de área construída, o imóvel oferece garagem para dois carros e pode ser dividido em diversas áreas de atendimento. A estrutura conta com ampla recepção, várias salas/quartos (incluindo uma suíte), banheiro adaptado para cadeirantes, lavanderia e áreas moduláveis para diversas especialidades. Uma localização privilegiada para o seu negócio prosperar!",
        address: "Sem endereço",
        number: "N/A",
        neighborhood: "Santa Eliza",
        city: "Pouso Alegre",
        state: "MG",
        zipCode: "N/A",
        price: 1600000,
        area: 300,
        bedrooms: 3,
        bathrooms: 3,
        garageSpaces: 1,
        type: "CASA",
        status: "ACTIVE",
        imageUrls: [
          "https://firebasestorage.googleapis.com/v0/b/wilson-corretor-imoveis.firebasestorage.app/o/properties%2F1753491835514_cs-01.jpg?alt=media&token=a38c19d7-a3fc-4b3c-80b1-1f9d0ff8094e",

          "https://firebasestorage.googleapis.com/v0/b/wilson-corretor-imoveis.firebasestorage.app/o/properties%2F1753491838406_cs-02.jpg?alt=media&token=0d9bfe44-ff50-48ac-8078-5bb5dd8eb292",

          "https://firebasestorage.googleapis.com/v0/b/wilson-corretor-imoveis.firebasestorage.app/o/properties%2F1753491840164_cs-15.jpg?alt=media&token=a7c7d052-3960-4471-a961-75960bc583fa",

          "https://firebasestorage.googleapis.com/v0/b/wilson-corretor-imoveis.firebasestorage.app/o/properties%2F1753491842563_cs-03.jpg?alt=media&token=b7fd4938-7a5c-429d-ad23-32bb12cf3910",

          "https://firebasestorage.googleapis.com/v0/b/wilson-corretor-imoveis.firebasestorage.app/o/properties%2F1753491844401_cs-04.jpg?alt=media&token=bed56f29-4562-45fe-948e-8dad1c98b44b",

          "https://firebasestorage.googleapis.com/v0/b/wilson-corretor-imoveis.firebasestorage.app/o/properties%2F1753491845257_cs-05.jpg?alt=media&token=16de90c7-76a7-46a1-8a6e-0b93093e013c",

          "https://firebasestorage.googleapis.com/v0/b/wilson-corretor-imoveis.firebasestorage.app/o/properties%2F1753491846167_cs-06.jpg?alt=media&token=95f3db2a-ab7f-47df-81a0-9a3f6bddf5b9",

          "https://firebasestorage.googleapis.com/v0/b/wilson-corretor-imoveis.firebasestorage.app/o/properties%2F1753491847937_cs-07.jpg?alt=media&token=aded17f6-707c-4bfb-bde8-6ccae24f5730",

          "https://firebasestorage.googleapis.com/v0/b/wilson-corretor-imoveis.firebasestorage.app/o/properties%2F1753491848737_cs-08.jpg?alt=media&token=74b84c5a-7763-4bcb-8766-74cbff7cb42a",

          "https://firebasestorage.googleapis.com/v0/b/wilson-corretor-imoveis.firebasestorage.app/o/properties%2F1753491850362_cs-09.jpg?alt=media&token=70cfff13-166e-4858-aaf5-6173199c84aa",

          "https://firebasestorage.googleapis.com/v0/b/wilson-corretor-imoveis.firebasestorage.app/o/properties%2F1753491851138_cs-10.jpg?alt=media&token=d3c75ea2-c78a-4fdd-98d3-325118db5b98",

          "https://firebasestorage.googleapis.com/v0/b/wilson-corretor-imoveis.firebasestorage.app/o/properties%2F1753491851957_cs-11.jpg?alt=media&token=0e210857-784e-475b-b832-4af47956c009",

          "https://firebasestorage.googleapis.com/v0/b/wilson-corretor-imoveis.firebasestorage.app/o/properties%2F1753491853541_cs-12.jpg?alt=media&token=56f5a939-b1b4-4a5f-b68b-09a2d7fa8328",

          "https://firebasestorage.googleapis.com/v0/b/wilson-corretor-imoveis.firebasestorage.app/o/properties%2F1753491854347_cs-13.jpg?alt=media&token=228e6f37-e02c-4fae-b472-ae75fb6eff05",

          "https://firebasestorage.googleapis.com/v0/b/wilson-corretor-imoveis.firebasestorage.app/o/properties%2F1753491856017_cs-14.jpg?alt=media&token=bc9e1664-1866-4047-9e96-73831b187e32",
        ],
        featured: true,
        views: 150,
        slug: "casa-comercial-santa-eliza",
        latitude: null,
        longitude: null,
        createdById: adminUser.id,
      },
    ]

    const createdProperties = []
    for (const property of properties) {
      const created = await prisma.property.create({ data: property })
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
      const created = await prisma.tag.create({ data: tag })
      createdTags.push(created)
    }

    // ARTIGOS DO BLOG
    console.log("📝 Criando artigos...")
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
    ]

    const createdArticles = []
    for (const article of articles) {
      const created = await prisma.article.create({ data: article })
      createdArticles.push(created)
    }

    // ASSOCIAÇÕES ARTIGO-TAG
    await prisma.articleTag.create({
      data: {
        articleId: createdArticles[0].id,
        tagId: createdTags[0].id,
      },
    })

    // CONTATOS
    console.log("📞 Criando contatos...")
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
    ]

    for (const contact of contacts) {
      await prisma.contact.create({ data: contact })
    }

    // FAVORITOS
    console.log("❤️ Criando favoritos...")
    await prisma.favorite.create({
      data: {
        userId: clientUser.id,
        propertyId: createdProperties[0].id,
      },
    })

    // CONFIGURAÇÕES DO SITE
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
      await prisma.siteConfig.create({ data: config })
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
