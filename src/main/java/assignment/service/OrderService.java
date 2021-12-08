package assignment.service;

import assignment.entity.Order;
import assignment.repository.OrderRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class OrderService {
    @Autowired
    OrderRepo orderRepo;
    public void addOrder(Order order){
        this.orderRepo.save(order);
    }

    public List<Order> getAllOrders(int current_page){
        return this.orderRepo.findAll(PageRequest.of(current_page,10, Sort.by("id"))).getContent();
    }

    public List<Order> getOrdersByUser(String user){
        return orderRepo.findAllByUseridContains(user);
    }
}
