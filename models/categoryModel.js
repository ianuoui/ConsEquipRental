const { text } = require('express')
const mongoose = require('mongoose')

const categorySchema = mongoose.Schema(   
    {    
        name: { 
            type: String, 
            unique: true, 
            required: [true, 'Please enter the Category Name'], 
        },
        description: { 
            type: String, 
        },
        images:[
            {
                url: {type: String}, 
                altText: {type: String}
            }   
        ],
        catFilterAttr:[
            {
                filter:{type: String},  
                filterValues:[
                    {
                        filterVal: {type: String}  
                    }
                ],
            }            
        ],
        filterAttr1: {
            type: String,
        },
        filterAttr2: {
            type: String,
        },  
        filterAttr3: {
            type: String,
        }, 
    },
    { timestamps: true}
)

module.exports = mongoose.model('Category', categorySchema)
