"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, BookOpen, Church, Heart, Users } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="bg-background py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6 max-w-4xl"
          >
            <div className="flex items-center gap-3">
              <div className="h-1 w-12 bg-primary rounded-full"></div>
              <p className="font-display text-sm font-semibold text-primary uppercase tracking-wider">Nossa História</p>
            </div>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-tight text-balance">
              Comunidade Evangélica Luterana Ebenézer
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
              &quot;Até aqui o Senhor Deus nos ajudou&quot; - 1 Samuel 7:12
            </p>
          </motion.div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-16 lg:py-24 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl"
            >
              <img
                src="/assets/about_community.jpg"
                alt="Nossa comunidade"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex flex-col gap-6"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-1 w-12 bg-primary rounded-full"></div>
                  <p className="font-display text-sm font-semibold text-primary uppercase tracking-wider">
                    Quem Somos
                  </p>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                  Uma Comunidade de Fé
                </h2>
              </div>
              <div className="flex flex-col gap-5 text-lg text-muted-foreground leading-relaxed">
                <p>
                  A Comunidade Evangélica Luterana Ebenézer é uma congregação filiada à Igreja Evangélica Luterana do Brasil – IELB. Temos como finalidade propagar o evangelho de Jesus Cristo por meio da palavra, do livro, do jornal, do rádio, da TV e de outros meios condignos, e administrar os Sacramentos do Santo Batismo e da Santa Ceia ordenados pelo Senhor Jesus Cristo.
                </p>
                <p>
                  Aceitamos toda a Bíblia, a Escritura Sagrada, tanto do Antigo como do Novo Testamento, como a infalível palavra de Deus, visto que seus autores a escreveram inspirados pelo Espírito Santo.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Beginning Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-12"
          >
            <div className="flex flex-col gap-4 max-w-3xl">
              <div className="flex items-center gap-3">
                <div className="h-1 w-12 bg-primary rounded-full"></div>
                <p className="font-display text-sm font-semibold text-primary uppercase tracking-wider">
                  Assim Começou Um Sonho
                </p>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
                Fundação em 31 de Outubro de 1980
              </h2>
            </div>
            <div className="flex flex-col gap-6 text-lg text-muted-foreground leading-relaxed max-w-4xl">
              <p>
                A história da Comunidade Evangélica Luterana Ebenézer tem como marco o dia 31 de outubro de 1980. Nessa data, na residência da família do Sr. Alfredo Oestereich, situada na Rua Bertha Weege, número 367, no bairro Barra do Rio Cerro, em Jaraguá do Sul, reuniram-se um grupo de membros até então pertencentes à Comunidade Evangélica Luterana Emanuel, com o objetivo de fundar a nova comunidade.
              </p>
              <p>
                Já era final da tarde, quando o Sr. Alfredo Oestereich e o pastor Luiz Adolfo Hegele retornavam de uma reunião distrital. Ficaram um bom tempo conversando na varanda da casa do Sr. Alfredo sobre a possibilidade de criar uma nova comunidade no bairro Barra do Rio Cerro. O Sr. Alfredo Oestereich, com seu sorriso maroto, falou ao pastor que esse problema já estava resolvido. Naquele momento, emocionado, disse ao pastor que doaria o terreno que se via ao fundo de sua varanda para iniciar os trabalhos da nova comunidade evangélica luterana na Barra do Rio Cerro.
              </p>                <p>
                A nova comunidade foi formada por 15 famílias, 16 membros votantes, totalizando 54 pessoas. Seu nome foi escolhido com base em 1Sm 7.12 (NTLH): &quot;Aí Samuel pegou uma pedra, pôs entre Mispa e Sem e disse: - Até aqui o Senhor Deus nos ajudou. Por isso deu a ela o nome de Ebenézer.&quot;
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission, Purpose & Vision Section */}
      <section className="py-16 lg:py-24 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-16"
          >
            <div className="flex flex-col gap-4 text-center max-w-3xl mx-auto">
              <div className="flex items-center gap-3 justify-center">
                <div className="h-1 w-12 bg-primary rounded-full"></div>
                <p className="font-display text-sm font-semibold text-primary uppercase tracking-wider">
                  Planejamento IELB
                </p>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
                Nossa Missão, Propósito e Visão
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-card border border-border p-8 rounded-2xl flex flex-col gap-5 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <Heart className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground">Nossa Missão</h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Proclamar Cristo para Todos
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-card border border-border p-8 rounded-2xl flex flex-col gap-5 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <BookOpen className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground">Nosso Propósito</h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Compartilhar o evangelho de Cristo para promover a evangelização e o crescimento espiritual
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-card border border-border p-8 rounded-2xl flex flex-col gap-5 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <Users className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground">Nossos Valores</h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  A ação e o amor de Deus através da sua Palavra e dos sacramentos do Batismo e da Santa Ceia, que concedem perdão, vida e salvação em Cristo a todos os que creem
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-card border border-border p-8 rounded-2xl flex flex-col gap-5 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <Church className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground">Nossa Visão</h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Sermos uma Igreja Luterana confessional que vai ao encontro das necessidades das pessoas
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Growth & Timeline Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-12"
          >
            <div className="flex flex-col gap-4 max-w-3xl mx-auto text-center">
              <div className="flex items-center gap-3 justify-center">
                <div className="h-1 w-12 bg-primary rounded-full"></div>
                <p className="font-display text-sm font-semibold text-primary uppercase tracking-wider">
                  Crescimento e Desenvolvimento
                </p>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
                Nossa Jornada de Fé
              </h2>
            </div>
            <div className="flex flex-col gap-6 text-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto">
              <p>
                Em 1981, a CEL Emanuel doou sua antiga capela para a CEL Ebenézer, que foi totalmente desmontada e transferida para sua nova localização no terreno doado pelo Sr. Alfredo Oestereich, na rua Concórdia, bairro Barra do Rio Cerro. Em 7 de junho de 1981, foi celebrado o culto de consagração da capela, num dia festivo, com culto, almoço e café de confraternização.
              </p>
              <p>
                Em 1985, iniciaram-se os primeiros estudos para construção da nova igreja. O sonho de cinco anos atrás começava a tomar forma. Em outubro de 1986, foi lançada a pedra fundamental da nova igreja. No ano seguinte, 1987, iniciou-se a construção do templo sustentada praticamente com recursos próprios obtidos da campanha interna com a participação das famílias integrantes da comunidade.
              </p>
              <p>
                Em 13 de junho de 2002, foi fundada a Paróquia Evangélica Luterana Ebenézer, formada pelas comunidades Ebenézer (sede) e Salvador (Rio da Luz). Aquela pequena comunidade fundada em outubro de 1980 agora passava a ser sede de paróquia.
              </p>
              <p className="font-semibold text-foreground text-xl mt-4">
                Quando paramos um pouco e olhamos para trás, podemos ver o quanto essa comunidade cresceu e o potencial de crescimento que possui. Com toda certeza, podemos dizer como Samuel: &quot;Até aqui o Senhor Deus nos ajudou.&quot; (1Sm 7.12)
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 lg:py-24 bg-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center flex flex-col gap-8 items-center"
          >
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground max-w-3xl leading-tight">
              Faça parte da nossa jornada de fé
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Venha conhecer a Congregação Ebenézer e descobrir como você pode crescer espiritualmente e fazer a diferença na vida de outras pessoas através do amor de Cristo.
            </p>
            <Link
              href="/events"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-primary rounded-xl font-display text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Conheça nossos eventos
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
