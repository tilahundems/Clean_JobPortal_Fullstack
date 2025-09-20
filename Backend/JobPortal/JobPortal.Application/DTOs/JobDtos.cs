using JobPortal.Domain;

namespace JobPortal.Application;


    public class JobDtos
    {
    public Guid Id { get; set; }
    public Guid PostedById { get; set; }
    public DateTime PostedDate { get; set; }
    public DateTime ExpiryDate { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public ICollection<JobApplication> Applications { get; set; } = new List<JobApplication>();

    }
    
 public class JobDto{ 
     public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public DateTime PostedDate { get; set; }
    public DateTime ExpiryDate { get; set; }
    public Guid PostedById { get; set; }


    }

    public class CreatejobDto{ 
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public DateTime ExpiryDate { get; set; }
    public Guid PostedById { get; set; }


    }


    

