const express=require('express')
const {
    createInventory,
    getInventory,
    getInventorys,
    deleteInventory,
    updateInventory
}=require('../controllers/inventoryController')

const router= express.Router()

//GET all workouts
router.get('/',getInventorys)

//GET a single workout
router.get('/:id',getInventory)

//POST a new workout
router.post('/', createInventory)

//DELETE a workout
router.delete('/:id',deleteInventory)

//UPDATE a workout
router.patch('/:id',updateInventory)

module.exports=router