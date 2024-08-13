import { gql } from 'graphql-tag';
import Constants from 'expo-constants';

const MASTER_URL = "https://us-east-1-shared-usea1-02.cdn.hygraph.com/content/clzjubxdp04mo0duxasajyypo/master";

const getHygraphToken = () => {
    if (Constants.expoConfig && Constants.expoConfig.extra) {
      return Constants.expoConfig.extra.hygraphToken;
    } else if (Constants.manifest && Constants.manifest.extra) {
      return Constants.manifest.extra.hygraphToken;
    } else {
      console.warn('hygraph token is missing');
      return null;
    }
  };
const HYGRAPH_TOKEN = getHygraphToken();

const getSlider = async () => {
    const query = gql`
    query GetSlider {
        sliders {
            id
            name
            image {
                url
            }
        }
    }
    `;

    console.log('Hygraph Token:', HYGRAPH_TOKEN);  //todo remove befor build

    try {
        const response = await fetch(MASTER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${HYGRAPH_TOKEN}`,
            },
            body: JSON.stringify({ query: query.loc.source.body }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return result.data;
    } catch (error) {
        console.error('Error fetching sliders data:', error);
        throw error;
    }
};

//api call for getting categories
const getCategories = async () => {
    const query = gql`
    query GetCategory {
        categories {
            id
            name
            icon {
                url
            }
        }
    }
    `;

    console.log('Hygraph Token:', HYGRAPH_TOKEN); //todo remove befor build

    try {
        const response = await fetch(MASTER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${HYGRAPH_TOKEN}`,
            },
            body: JSON.stringify({ query: query.loc.source.body }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return result.data;
    } catch (error) {
        console.error('Error fetching category data:', error);
        throw error;
    }
};

// Get list of service api call
const getServiceList = async () => {
    const query = gql`
    query GetServiceList {
        serviceLists {
            id
            name
            email
            contactPerson
            address
            about
            category {
                name
            }
            images {
                url
            }
        }
    }
    `;

    console.log('Hygraph Token:', HYGRAPH_TOKEN); //todo remove befor build

    try {
        const response = await fetch(MASTER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${HYGRAPH_TOKEN}`,
            },
            body: JSON.stringify({ query: query.loc.source.body }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return result.data;
    } catch (error) {
        console.error('Error fetching service list data:', error);
        throw error;
    }
};

export default {
    getSlider,
    getCategories,
    getServiceList
};
