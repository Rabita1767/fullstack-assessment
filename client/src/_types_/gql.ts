import { gql } from "@apollo/client";

export const ALL_PRODUCT_LIST_QUERY = gql`
  query Query($userId: Int!, $filter: String!) {
    allProducts(userId: $userId, filter: $filter) {
      id
      title
      description
      price
      rent_amount
      rent_rate
      posted
      views
      status
      user {
        id
      }
      category_product {
        id
        category {
          id
          name
        }
      }
      rent_instance {
        id
        productId
        from
        to
        userId
      }
    }
  }
`;

export const SINGLE_PRODUCT_QUERY = gql`
  query Query($id: String!) {
    oneProduct(id: $id) {
      id
      title
      description
      price
      rent_amount
      rent_rate
      posted
      views
      status
      user {
        id
      }
      category_product {
        id
        category {
          id
          name
        }
      }
    }
  }
`;

export const CREATE_PRODUCT_MUTATION = gql`
  mutation Mutation(
    $title: String!
    $description: String!
    $price: Int!
    $rent_amount: Int!
    $rent_rate: String!
    $posted: String!
    $category: [String]!
    $userId: Int!
  ) {
    productAdd(
      title: $title
      description: $description
      price: $price
      rent_amount: $rent_amount
      rent_rate: $rent_rate
      posted: $posted
      category: $category
      userId: $userId
    ) {
      id
      title
      price
      price
      rent_amount
      rent_rate
      posted
      views
      category_product {
        id
        category {
          name
        }
      }
    }
  }
`;

export const UPDATE_PRODUCT_QUERY = gql`
  mutation Mutation(
    $id: ID
    $title: String
    $description: String
    $price: Int
    $category: [String]
    $rent_amount: Int
    $rent_rate: String
  ) {
    productUpdate(
      id: $id
      title: $title
      description: $description
      price: $price
      category: $category
      rent_amount: $rent_amount
      rent_rate: $rent_rate
    ) {
      id
      title
      price
      price
      rent_amount
      rent_rate
      posted
      views
      category_product {
        id
        category {
          name
        }
      }
    }
  }
`;

export const RENT_PRODUCT = gql`
  mutation Mutation(
    $productId: Int!
    $userId: Int!
    $from: String!
    $to: String!
  ) {
    rentProduct(productId: $productId, userId: $userId, from: $from, to: $to) {
      id
      productId
      from
      to
      userId
      product {
        id
        title
        description
        price
        rent_amount
        rent_rate
        posted
        views
        status
        userId
      }
      user {
        id
        first_name
        last_name
        address
        phone
      }
    }
  }
`;

export const PURCHASE_PRODUCT_MUTATION = gql`
  mutation Mutation($productId: Int!, $userId: Int!) {
    purchaseProduct(productId: $productId, userId: $userId) {
      id
      userId
      productId
    }
  }
`;

export const CATEGORY_LIST_QUERY = gql`
  query Query {
    category {
      id
      name
    }
  }
`;

export const LOGIN_QUERY = gql`
  query Query($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      status
      admin
      token
      user {
        id
        first_name
        last_name
        address
        phone
      }
    }
  }
`;

export const SIGNUP_QUERY = gql`
  mutation Mutation(
    $first_name: String!
    $last_name: String!
    $email: String!
    $password: String!
    $address: String!
    $phone: String!
  ) {
    signup(
      first_name: $first_name
      last_name: $last_name
      email: $email
      password: $password
      address: $address
      phone: $phone
    ) {
      email
      first_name
      last_name
      address
      phone
    }
  }
`;

export const DELETE_PRODUCT_MUTATION = gql`
  mutation Mutation($productId: Int!) {
    deleteProduct(productId: $productId) {
      id
      title
      description
      price
      rent_amount
      rent_rate
      posted
      views
      status
      user {
        id
      }
      category_product {
        id
        category {
          id
          name
        }
      }
    }
  }
`;
