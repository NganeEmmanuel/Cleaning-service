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

// Get list of service api call
const getServiceListByCategory = async (category) => {    
    const query = gql`
    query GetServiceList {
        serviceLists(where: {category: {name: "${category}"}}) {
            id
            name
            about
            address
            contactPerson
            category {
                name
            }
            images {
                url
            }
        }
    }
    `;

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
        console.error(`Error fetching service list data by category (${category}):`, error);
        throw error;
    }
};

// Get list of service api call
const createBooking = async (data) => {    
    const query = gql`
        mutation CreateBooking {
            createBooking(
                data: {
                    userName: "${data.username}",
                    userEmail: "${data.userEmail}",
                    bookingStatus: booked,
                    service: {connect: {id: "${data.serviceID}"}},
                    date: "${data.date}",
                    time: "${data.time}",
                    notes: "${data.notes}"
                }
            ) {
                id
            }
            publishManyBookingsConnection {
                aggregate {
                count
                }
            }
        }
    `;

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
        console.error(`Error creating the booking for this data: (${data}):`, error);
        throw error;
    }
};


export default {
    getSlider,
    getCategories,
    getServiceList,
    getServiceListByCategory,
    createBooking
};
