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

/**
 * @returns an array of Sliders
 */
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

/**
 * @returns an array of all categories
 */
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

/**
 * @returns an array of all available service lists
 */
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

/**
 * @param category string indicating the category of service
 * @returns an array of service in that category
 */
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

/**
 * @param data object containing the information for each booking
 * @returns id of the booking created
 */
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
            publishManyBookingsConnection(to: PUBLISHED) {
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

/**
 * @param userEmail email of currently logged in user
 * @returns an array of Bookings by that user
 */
const getBookingByUserEmail = async (userEmail) => {    
    const query = gql`
        query GetBookingsByUserEmail {
            bookings(where: {userEmail: "${userEmail}"}, orderBy: updatedAt_DESC) {
                id
                date
                time
                bookingStatus
                notes
                service {
                id
                name
                about
                address
                contactPerson
                email
                images {
                    url
                }
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
        console.error(`Error fetching booking list data by userEmail (${userEmail}):`, error);
        throw error;
    }
};

/**
 * @param bookingID id(string) identifying the booking for this loggedin user
 * @param status string indicating the status of this booking
 * @returns an the id of the booking
 */
const updateBookingStatus = async (bookingID, status) => {    
    const query = gql`
        mutation MarkBookingAsComplete {
            updateBooking(data: {bookingStatus: ${status}}, where: {id: "${bookingID}"}) {
                id
            }
            publishBooking(where: {id: "${bookingID}"}) {
                id
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
        console.error(`Error fetching marking booing as complete with id (${bookingID}):`, error);
        throw error;
    }
};

/**
 * @param userEmail email of currently logged in user
 * @returns an array of Services by that user
 */
const getServicesByUserEmail = async (userEmail) => {    
    const query = gql`
        query GetServiceListByUserEmail {
            serviceLists(where: {email: "${userEmail}"}) {
                about
                address
                createdAt
                id
                name
                pricePerHour
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
        console.error(`Error fetching service list data by userEmail (${userEmail}):`, error);
        throw error;
    }
};


export default {
    getSlider,
    getCategories,
    getServiceList,
    getServiceListByCategory,
    createBooking,
    getBookingByUserEmail,
    updateBookingStatus,
    getServicesByUserEmail
};
