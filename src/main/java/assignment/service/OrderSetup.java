package assignment.service;

import assignment.entity.UserTemp;
import assignment.repository.UserTempRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Service
public class OrderSetup {
    @Autowired
    UserTempRepo userTempRepo;
    public void addAll(List<UserTemp> userTemps){
        this.userTempRepo.saveAll(userTemps);
    }

}
