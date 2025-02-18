import request, { gql } from "graphql-request";

const MASTER_URL =
  "https://us-west-2.cdn.hygraph.com/content/cm6sudy5h00jg07w08zn7vvcl/master";

export const getMen = async () => {
  const query = gql`
    query MyQuery {
      mensCatalogs {
        mensCatalogDescription
        mensCatalogLocation
        mensCatalogNumber
        mensDiscountPrice
        mensRatingNumber
        mensCatalogPrice
        mensCatalogTitle
        mensCatalogUpload
        inStock
        mensCatalogImage {
          url
        }
        id
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
        femalesCatalogDescription
        femalesCatalogLocation
        femalesDiscountPrice
        femalesRatingNumber
        femalesCatalogNumber
        femalesCatalogPrice
        femalesCatalogTitle
        inStock
        femalesCatalogUploadDate
        femalesCatalogImage {
          url
        }
        id
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
        kidsCatalogDescription
        kidsCatalogLocation
        kidsCatalogNumber
        kidsDiscountPrice
        kidsRatingNumber
        kidsCatalogPrice
        kidsCatalogTitle
        inStock
        kidsCatalogUploadDate
        kidsCatalogImage {
          url
        }
        id
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
        brandsDiscountPrice
        brandsRatingNumber
        brandsPrice
        brandsTitle
        brandsUpload
        inStock
        brandsImage {
          url
        }
        id
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
        blogContent
        blogUploadDate
        blogImage {
          url
        }
        id
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
        shopDescription
        shopDiscountPrice
        shopRatingNumber
        shopPrice
        shopTitle
        inStock
        shopPercentageNumber
        shopImage {
          url
        }
        id
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};
