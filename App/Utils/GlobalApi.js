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
        return 'unsuccessful'
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
        console.error('Error fetching service list data:', error);
        return 'unsuccessful'
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
       return 'unsuccessful'
    }
};

/**
 * @param id id of the booking ou want to publish
 * @returns count
 */
const publishBooking = async (id) => {
    const query = gql`

        mutation PublishBooking {
            publishManyBookingsConnection(to: PUBLISHED, where: {id: "${id}"}) {
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
        console.error(`Error publishing Booking with id: ${id}:`, error);
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
                    phoneNumber: "${data.phoneNumber}",
                    notes: "${data.notes}"
                }
            ) {
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
        const publishData = await publishBooking(result.data.createBooking.id)
        return 'success';
    } catch (error) {
        console.error(`Error creating the booking for this data: (${data}):`, error);
        return 'error';
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
                pricePerHour
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
        return 'success';
    } catch (error) {
        console.error(`Error fetching marking booing as complete with id (${bookingID}):`, error);
        return 'unsuccessful'
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
                serviceStatus
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

/**
 * @param userEmail String of user email address
 * @returns a list of all bookings associated with services associated with this email
 */
const getOrdersByUserEmail = async (userEmail) => {    
    const query = gql`
        query GetOrdersByUserEmail {
            bookings(where: {service: {email: "${userEmail}"}}) {
                id
                notes
                bookingStatus
                createdAt
                userName
                time
                date
                phoneNumber
                service {
                    about
                    address
                    name
                    pricePerHour
                    serviceStatus
                    id
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
        console.error(`Error fetching orders with for useremail (${userEmail}):`, error);
        throw error;
    }
};

/**
 * @param image image object you wan to add in the database
 * @returns id of the added image
 */
const createAsset = async (image) => {
    const query = gql`
        mutation CreateAsset {
            createAsset(data: {}) {
                id
                url
                upload {
                    status
                    expiresAt
                    error {
                        code
                        message
                    }
                    requestPostData {
                        key
                        policy
                        algorithm
                        credential
                        date
                        securityToken
                        signature
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
        return result.data.createAsset;
    } catch (error) {
        console.error(`Error adding service for this data: (${JSON.stringify(data)}):`, error);
        throw error;
    }
};

const uploadImageToS3 = async (image) => {
    try {
        // Step 1: Get the upload details
        const { url, id, error, upload } = await createAsset(image);
        console.log(id)

        const formData = new FormData();
        formData.append('X-Amz-Date', upload.requestPostData.date);
        formData.append('key', upload.requestPostData.key);
        formData.append('X-Amz-Signature', upload.requestPostData.signature);
        formData.append('X-Amz-Algorithm', upload.requestPostData.algorithm);
        formData.append('policy', upload.requestPostData.policy);
        formData.append('X-Amz-Credential', upload.requestPostData.credential);
        formData.append('X-Amz-Security-Token', upload.requestPostData.securityToken);
        formData.append('file', {
            uri: image.uri,
            type: image.type,
            name: image.filename,
        });

        // Step 2: Upload the image to S3
        const uploadResponse = await fetch(upload.requestPostData.url, {
            method: 'POST',
            body: formData,
        });

        // Log the response status
        console.log('Upload Response Status:', uploadResponse.status);

        if (uploadResponse.status === 204) {
            // Handle successful upload
            console.log('Upload successful.');
            return id;
        } else {
            // Handle other response status
            const responseText = await uploadResponse.text();
            throw new Error(`HTTP error! status: ${uploadResponse.status}`);
        }
    } catch (error) {
        console.error('Error uploading image to S3:', error);
        throw error;
    }
};

/**
 * @param id id of the asset ou want to publish
 * @returns count
 */
const publishAsset = async (id) => {
    const query = gql`
        mutation publishAsset {
            publishManyAssetsConnection(to: PUBLISHED, where: {id: "${id}"}) {
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
        console.error(`Error publishing asset with id: ${id}:`, error);
        throw error;
    }
};

/**
 * @param id id of the service you want to publish
 * @returns count
 */
const publishService = async (id) => {
    const query = gql`
        mutation publishService {
            publishManyServiceListsConnection(to: PUBLISHED, where: {id: "${id}"}) {
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
        console.error(`Error publishing service with id: ${id}:`, error);
        throw error;
    }
};





/**
 * @param data object containing the information for the service we are adding
 * @returns id of the service created
 */
const addService = async (data) => {
    // Step 1: Upload images and get asset IDs
    const imageAssetIds = await Promise.all(data.images.map(async (image) => {
        const assetId = await uploadImageToS3(image);
        return assetId;
    }));
    
    //get is of assets
    const ids = imageAssetIds;

    // Step 2: Use the asset IDs to create the service entry
    const query = gql`
        mutation AddService {
            createServiceList(
                data: {
                    name: "${data.serviceName}", 
                    contactPerson: "${data.contactPerson}",
                    phoneNumber: "${data.contactNumber}", 
                    email: "${data.email}", 
                    about: "${data.description}", 
                    address: "${data.address}", 
                    pricePerHour: "${data.pricePerHour}", 
                    serviceStatus: active, 
                    category: {connect: {id: "${data.selectedOption}"}},
                    images: {connect: [${imageAssetIds.map(id => `{id: "${id}"}`).join(", ")}]}
                }
            ) {
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

        //publish service and assets
        console.log('serviceid: ', result.data.createServiceList.id)
        const publishedServiceData = await publishService(result.data.createServiceList.id)
        ids.map(id => publishAsset(id))
        return "success";
    } catch (error) {
        console.error(`Error adding service for this data: (${JSON.stringify(data)}):`, error);
        return "unsuccessful"
    }
};


/**
 * Deletes a service with matching id from the database
 * 
 * @param serviceID String of service id you want to delete
 * @returns the id if the service that has been deleted
 */
const deleteServiceById = async (serviceID) => {    
    const query = gql`
        mutation delateServiceByIdAndUserEmail {
            deleteServiceList(where: {id: "${serviceID}"}) {
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
        return "success";
    } catch (error) {
        console.error(`Error deleting service with id (${serviceID}):`, error);
        return "unsuccessful"
    }
};

/**
 * Updates the service status who's id matches the provided id in the database
 * 
 * @param serviceID String of service id you want to delete
 * @param status the new status you want to change to
 * @returns the id if the service whoes status has changed
 */
const updateServiceStatus = async (serviceID, status) => {    
    const query = gql`
        mutation updateServiceStatus {
            updateServiceList(where: {id: "${serviceID}"}, data: {serviceStatus: ${status}}) {
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
        const publishedServiceData = await publishService(result.data.updateServiceList.id)
        return "success";
    } catch (error) {
        console.error(`Error update service status with id (${serviceID}):`, error);
        return "unsuccessful"
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
    getServicesByUserEmail,
    getOrdersByUserEmail,
    addService,
    deleteServiceById,
    updateServiceStatus
};
