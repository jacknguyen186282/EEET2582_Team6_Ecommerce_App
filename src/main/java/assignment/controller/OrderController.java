package assignment.controller;

import assignment.entity.Order;
import assignment.service.OrderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/order")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @RequestMapping(path = "/getOrders", method = RequestMethod.GET)
    public List<Order> getOrders(@RequestParam String page) {
        try {
            return orderService.getAllOrders(Integer.parseInt(page));
        }catch (Exception e){
            return null;
        }
    }

    @RequestMapping(path = "/addOrder", method = RequestMethod.POST)
    public String addOrder(Order order){
        try{
            orderService.addOrder(order);
            return "Success!";
        }
        catch (Exception e){
            return "Failed!";
        }
    }

    @RequestMapping(path = "/getOrderByUser", method = RequestMethod.GET)
    public List<Order> getOrderByUser(@RequestParam String user_id){
        try{
            return orderService.getOrdersByUser(user_id);
        }
        catch (Exception e){
            return null;
        }
    }

}
