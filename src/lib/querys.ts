import { gql } from '@apollo/client';
import { getClient } from '@/src/lib/apolloClient';

const apolloClient = getClient();

export const QueryInformacoes = {
  postType: 'informacoes',
  acf: 'acfInformacoes',
  queryInit: function () {
    return gql`
      query NewQuery {
        ${this.postType} {
          nodes {
            ${this.acf} {
              email
              emailFormularioProbono
              endereco {
                cidade
                rua
              }
              linkMapa
              telefone
            }
          }
        }
      }
    `;
  },
  queryExecute: async function () {
    const result = await (
      await apolloClient.query({ query: this.queryInit() })
    ).data;

    return {
      informacoes: {
        telefone: result[this.postType].nodes[0][this.acf].telefone,
        telefoneLabel:
          (result[this.postType].nodes[0][this.acf].telefone as string)
            .replace(/\D/gm, '')
            .replace(/[0-9]{2}/, '')
            .replace(/([0-9]{2})([0-9]{0,})/, '$1 $2') || null,
        emailContato: result[this.postType].nodes[0][this.acf].email || null,
        emailProbono:
          result[this.postType].nodes[0][this.acf].emailFormularioProbono ||
          null,
        linkMapa: result[this.postType].nodes[0][this.acf].linkMapa || null,
        endereco: result[this.postType].nodes[0][this.acf].endereco || null
      }
    };
  }
};

export const QueryEmailForm = {
  postType: 'allEMailForm',
  acf: 'acfemailform',
  queryInit: function () {
    return gql`
      query getEmailForm {
        ${this.postType} {
          nodes {
            ${this.acf} {
              emailForm
            }
          }
        }
      }
    `;
  },
  queryExecute: async function () {
    const result = await (
      await apolloClient.query({ query: this.queryInit() })
    ).data;

    return {
      email: result[this.postType]?.nodes[0][this.acf]?.emailForm || null
    };
  }
};

export const QueryRedesSociais = {
  postType: 'redesSociais',
  acf: 'acfRedesSociais',
  queryInit: function () {
    return gql`
      query getRedesSociais {
        ${this.postType} {
          nodes {
            ${this.acf} {
              facebook
              instagram
              linkedin
            }
          }
        }
      }
    `;
  },
  queryExecute: async function () {
    const result = await (
      await apolloClient.query({ query: this.queryInit() })
    ).data;

    return {
      redesSociais: {
        facebook: result[this.postType].nodes[0][this.acf].facebook || null,
        instagram: result[this.postType].nodes[0][this.acf].instagram || null,
        linkedin: result[this.postType].nodes[0][this.acf].linkedin || null
      }
    };
  }
};

export const QueryPortfolio = {
  postType: 'portfolios',
  acf: 'acfPortfolio',
  queryInit: function () {
    return gql`
      query getPortfolio {
        ${this.postType}(first: 100) {
          nodes {
            ${this.acf} {
              capaHome {
                sourceUrl
              }
            }
            categories {
              nodes {
                name
                slug
              }
            }
            title
            slug
          }
        }
      }
    `;
  },
  queryExecute: async function () {
    const result = await (
      await apolloClient.query({ query: this.queryInit() })
    ).data;

    const portfolio =
      result[this.postType]?.nodes.map((item: any) => {
        return {
          title: item.title || null,
          slug: item.slug || null,
          categorias: item.categories.nodes || null,
          capaHome: item[this.acf].capaHome.sourceUrl || null
        };
      }) || [];

    return {
      portfolio
    };
  }
};

export const QueryPortfolioInHome = {
  postType: 'portfolios',
  acf: 'acfPortfolio',
  queryInit: function () {
    return gql`
      query getPortfolio {
        ${this.postType}(
          where: {metaQuery: {metaArray: {compare: EQUAL_TO, key: "show_in_home", value: "1", type: DECIMAL}, relation: AND}}
          first: 100
        ) {
          nodes {
            ${this.acf} {
              capaHome {
                sourceUrl
              }
            }
            categories {
              nodes {
                name
                slug
              }
            }
            title
            slug
          }
        }
      }
    `;
  },
  queryExecute: async function () {
    const result = await (
      await apolloClient.query({ query: this.queryInit() })
    ).data;

    const portfolio =
      result[this.postType]?.nodes.map((item: any) => {
        return {
          title: item.title || null,
          slug: item.slug || null,
          categorias: item.categories.nodes || null,
          capaHome: item[this.acf].capaHome.sourceUrl || null
        };
      }) || [];

    return {
      portfolio
    };
  }
};

export const QueryCategories = {
  postType: 'categories',
  queryInit: function () {
    return gql`
      query getCategories {
        ${this.postType}(where: { hideEmpty: true }) {
          nodes {
            name
            slug
          }
        }
      }
    `;
  },
  queryExecute: async function () {
    const result = await (
      await apolloClient.query({ query: this.queryInit() })
    ).data;

    const categorias =
      [
        ...result[this.postType].nodes,
        {
          __typename: 'Category',
          name: 'Todos',
          slug: 'todos'
        }
      ] || [];

    return {
      categorias
    };
  }
};

export const QueryPortfolioBy = {
  postType: 'portfolio',
  acf: 'acfPortfolio',
  queryInit: function () {
    return gql`
      query GetPortfolioItem($id: ID = "") {
        ${this.postType}(id: $id, idType: SLUG) {
          ${this.acf} {
            blocoDeImagensDupla {
              tupleImgGroup {
                imagemDupla1 {
                  sourceUrl
                }
                imagemDupla2 {
                  sourceUrl
                }
              }
            }
            galeriaDeImagemFull {
              sourceUrl
                mediaDetails {
                width
                height
              }
            }
            resumoDescritivo
            urlVideo
          }
        }
      }
    `;
  },
  queryExecute: async function (slug: string) {
    const result = await (
      await apolloClient.query({
        query: this.queryInit(),
        variables: { id: slug }
      })
    ).data;

    return result[this.postType]?.[this.acf] || null;
  }
};

export const QueryAllSlugPortfolio = {
  postType: 'portfolios',
  queryInit: function () {
    return gql`
      query GetAllSlugsPortfolio {
        ${this.postType} {
          nodes {
            slug
          }
        }
      }
    `;
  },
  queryExecute: async function () {
    const result = await (
      await apolloClient.query({ query: this.queryInit() })
    ).data;

    return (
      result[this.postType]?.nodes?.map((item: { slug: string }) => {
        return { params: { nome: item.slug } };
      }) || []
    );
  }
};

export const executeAllQuerys = async () => {
  const [{ informacoes }, { redesSociais }, { portfolio }, { categorias }] =
    await Promise.all([
      await QueryInformacoes.queryExecute(),
      await QueryRedesSociais.queryExecute(),
      await QueryPortfolio.queryExecute(),
      await QueryCategories.queryExecute()
    ]);

  return {
    informacoes,
    redesSociais,
    portfolio,
    categorias
  };
};

export const executeAllQuerysHome = async () => {
  const [{ informacoes }, { redesSociais }, { portfolio }, { categorias }] =
    await Promise.all([
      await QueryInformacoes.queryExecute(),
      await QueryRedesSociais.queryExecute(),
      await QueryPortfolioInHome.queryExecute(),
      await QueryCategories.queryExecute()
    ]);

  return {
    informacoes,
    redesSociais,
    portfolio,
    categorias
  };
};
