import request, { gql } from "graphql-request";

const MASTER_URL =
  "https://us-west-2.cdn.hygraph.com/content/cm6sudy5h00jg07w08zn7vvcl/master";

export const getMen = async () => {
  const query = gql`
    query MyQuery {
      mensCatalogs {
        createdAt
        id
        mensCatalogDescription
        mensCatalogLocation
        mensCatalogNumber
        mensCatalogPrice
        mensCatalogTitle
        mensCatalogUpload
        publishedAt
        updatedAt
        mensCatalogImage {
          url
        }
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

export const getFemale = async () => {
  const query = gql`
    query MyQuery {
      femalesCatalogs {
        createdAt
        femalesCatalogDescription
        femalesCatalogLocation
        femalesCatalogNumber
        femalesCatalogPrice
        femalesCatalogTitle
        femalesCatalogUploadDate
        id
        publishedAt
        updatedAt
        femalesCatalogImage {
          url
        }
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

export const getKid = async () => {
  const query = gql`
    query MyQuery {
      kidsCatalogs {
        createdAt
        id
        kidsCatalogDescription
        kidsCatalogLocation
        kidsCatalogNumber
        kidsCatalogPrice
        kidsCatalogTitle
        kidsCatalogUploadDate
        publishedAt
        updatedAt
        kidsCatalogImage {
          url
        }
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

export const getBrand = async () => {
  const query = gql`
    query MyQuery {
      forBrandsProductions {
        brandsDescription
        brandsLocation
        brandsNumber
        brandsPrice
        brandsTitle
        brandsUpload
        createdAt
        id
        publishedAt
        updatedAt
        brandsImage {
          url
        }
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

export const getBlog = async () => {
  const query = gql`
    query MyQuery {
      blogs {
        blogDescription
        blogTitle
        createdAt
        id
        updatedAt
        blogContent
        blogUploadDate
        blogImage {
          url
        }
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

export const getShop = async () => {
  const query = gql`
    query MyQuery {
      shops {
        createdAt
        id
        inStock
        publishedAt
        shopDescription
        shopDiscountPrice
        shopPrice
        shopTitle
        updatedAt
        shopPercentageNumber
        shopImage {
          url
        }
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};
