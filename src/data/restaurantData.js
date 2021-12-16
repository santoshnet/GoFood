import {Icons, Images} from '../theme'

export const initialCurrentLocation = {
    streetName: "Garden City Mall",
    gps: {
        latitude: -1.232455,
        longitude: 36.878324
    }
}

export const categoryData = [
    {
        id: 1,
        name: "Rice",
        icon: Icons.rice_bowl,
    },
    {
        id: 2,
        name: "Noodles",
        icon: Icons.noodle,
    },
    {
        id: 3,
        name: "Hot Dogs",
        icon: Icons.hotdog,
    },
    {
        id: 4,
        name: "Salads",
        icon: Icons.salad,
    },
    {
        id: 5,
        name: "Burgers",
        icon: Icons.hamburger,
    },
    {
        id: 6,
        name: "Pizza",
        icon: Icons.pizza,
    },
    {
        id: 7,
        name: "Snacks",
        icon: Icons.fries,
    },
    {
        id: 8,
        name: "Sushi",
        icon: Icons.sushi,
    },
    {
        id: 9,
        name: "Desserts",
        icon: Icons.donut,
    },
    {
        id: 10,
        name: "Drinks",
        icon: Icons.drink,
    },

]
export const offerData = [
    {
        id: 1,
        title: "Gift Voucher",
        subTitle: "Pizza Hut",
        code: "GIFT50",
        offerName: "Black Friday",
        icon: Icons.hamburger,
    },
    {
        id: 2,
        title: "Big Discount",
        subTitle: "Only on",
        code: "Rs. 60",
        offerName: "",
        icon: Icons.drink,
    },

]

// price rating
export const affordable = 1
export const fairPrice = 2
export const expensive = 3

export const restaurantData = [
    {
        id: 1,
        name: "Chancelot Burger",
        rating: 4,
        categories: [5, 7],
        priceRating: affordable,
        photo: Images.burger_restaurant,
        duration: "30 - 45 min",
        location: {
            latitude: -1.219648,
            longitude: 36.888314,
        },
        courier: {
            avatar: Images.avatar_1,
            name: "Amy"
        },
        menu: [
            {
                menuId: 1,
                name: "Crispy Chicken Burger",
                photo: Images.crispy_chicken_burger,
                description: "Burger with crispy chicken, cheese and lettuce",
                calories: 200,
                price: 10
            },
            {
                menuId: 2,
                name: "Crispy Chicken Burger with Honey Mustard",
                photo: Images.honey_mustard_chicken_burger,
                description: "Crispy Chicken Burger with Honey Mustard Coleslaw",
                calories: 250,
                price: 15
            },
            {
                menuId: 3,
                name: "Crispy Baked French Fries",
                photo: Images.baked_fries,
                description: "Crispy Baked French Fries",
                calories: 194,
                price: 8
            }
        ]
    },
    {
        id: 2,
        name: "Chancelot Pizza",
        rating: 4.5,
        categories: [2, 4, 6],
        priceRating: expensive,
        photo: Images.pizza_restaurant,
        duration: "15 - 20 min",
        location: {
            latitude: -1.213126,
            longitude: 36.839998,
        },
        courier: {
            avatar: Images.avatar_2,
            name: "Jackson"
        },
        menu: [
            {
                menuId: 4,
                name: "Hawaiian Pizza",
                photo: Images.hawaiian_pizza,
                description: "Canadian bacon, homemade pizza crust, pizza sauce",
                calories: 250,
                price: 15
            },
            {
                menuId: 5,
                name: "Tomato & Basil Pizza",
                photo: Images.pizza,
                description: "Fresh tomatoes, aromatic basil pesto and melted bocconcini",
                calories: 250,
                price: 20
            },
            {
                menuId: 6,
                name: "Tomato Pasta",
                photo: Images.tomato_pasta,
                description: "Pasta with fresh tomatoes",
                calories: 100,
                price: 10
            },
            {
                menuId: 7,
                name: "Mediterranean Chopped Salad ",
                photo: Images.salad,
                description: "Finely chopped lettuce, tomatoes, cucumbers",
                calories: 100,
                price: 10
            }
        ]
    },
    {
        id: 3,
        name: "Chancelot Hotdogs",
        rating: 4.8,
        categories: [3],
        priceRating: expensive,
        photo: Images.hot_dog_restaurant,
        duration: "20 - 25 min",
        location: {
            latitude: -1.301789,
            longitude: 36.825724,
        },
        courier: {
            avatar: Images.avatar_3,
            name: "James"
        },
        menu: [
            {
                menuId: 8,
                name: "Chicago Style Hot Dog",
                photo: Images.chicago_hot_dog,
                description: "Fresh tomatoes, all beef hot dogs",
                calories: 100,
                price: 20
            }
        ]
    },
    {
        id: 4,
        name: "Chancelot Sushi",
        rating: 4,
        categories: [8],
        priceRating: expensive,
        photo: Images.japanese_restaurant,
        duration: "10 - 15 min",
        location: {
            latitude: -1.316393,
            longitude: 36.834484,
        },
        courier: {
            avatar: Images.avatar_4,
            name: "Ahmad"
        },
        menu: [
            {
                menuId: 9,
                name: "Sushi sets",
                photo: Images.sushi,
                description: "Fresh salmon, sushi rice, fresh juicy avocado",
                calories: 100,
                price: 50
            }
        ]
    },
    {
        id: 5,
        name: "Chancelot Cuisine",
        rating: 4.4,
        categories: [1, 2],
        priceRating: affordable,
        photo: Images.noodle_shop,
        duration: "15 - 20 min",
        location: {
            latitude: -1.312301,
            longitude: 36.816861,
        },
        courier: {
            avatar: Images.avatar_4,
            name: "Muthu"
        },
        menu: [
            {
                menuId: 10,
                name: "Kolo Mee",
                photo: Images.kolo_mee,
                description: "Noodles with char siu",
                calories: 200,
                price: 5
            },
            {
                menuId: 11,
                name: "Sarawak Laksa",
                photo: Images.sarawak_laksa,
                description: "Vermicelli noodles, cooked prawns",
                calories: 300,
                price: 8
            },
            {
                menuId: 12,
                name: "Nasi Lemak",
                photo: Images.nasi_lemak,
                description: "A traditional Malay rice dish",
                calories: 300,
                price: 8
            },
            {
                menuId: 13,
                name: "Nasi Briyani with Mutton",
                photo: Images.nasi_briyani_mutton,
                description: "A traditional Indian rice dish with mutton",
                calories: 300,
                price: 8
            },

        ]
    },
    {

        id: 6,
        name: "Chancelot Dessets",
        rating: 4.3,
        categories: [9, 10],
        priceRating: affordable,
        photo: Images.kek_lapis_shop,
        duration: "35 - 40 min",
        location: {
            latitude: -1.343406,
            longitude: 36.764942,
        },
        courier: {
            avatar: Images.avatar_1,
            name: "Jessie"
        },
        menu: [
            {
                menuId: 12,
                name: "Teh C Peng",
                photo: Images.teh_c_peng,
                description: "Three Layer Teh C Peng",
                calories: 100,
                price: 2
            },
            {
                menuId: 13,
                name: "ABC Ice Kacang",
                photo: Images.ice_kacang,
                description: "Shaved Ice with red beans",
                calories: 100,
                price: 3
            },
            {
                menuId: 14,
                name: "Kek Lapis",
                photo: Images.kek_lapis,
                description: "Layer cakes",
                calories: 300,
                price: 20
            }
        ]

    }
]

export const cartData = [
    {
        id: 1,
        quantity: 1,
        subTotal: 20,
        menu: {
            menuId: 8,
            name: "Chicago Style Hot Dog",
            photo: Images.chicago_hot_dog,
            description: "Fresh tomatoes, all beef hot dogs",
            calories: 100,
            price: 20
        }
    },
    {
        id: 2,
        quantity: 2,
        subTotal: 8,
        menu: {
            menuId: 11,
            name: "Sarawak Laksa",
            photo: Images.sarawak_laksa,
            description: "Vermicelli noodles, cooked prawns",
            calories: 300,
            price: 8
        },
    },

]


export default {
    restaurantData,
    initialCurrentLocation,
    categoryData,
    cartData
};
