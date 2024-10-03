  import React, { useState,useCallback } from "react";
  import { useForm, FormProvider,handleSubmit, Controller } from "react-hook-form";
  import "./App.css"; // Assuming you're using this for styles
  import Cropper from 'react-easy-crop';
  import ImageUploadAndCrop from './ImageUploadAndCrop';


  
  
  function MultiStepForm() {
    const methods = useForm(); // Initialize react-hook-form
    const { register,trigger, formState: { errors } } = methods;
    const [step, setStep] = useState(1); // Managing form steps
    const [position, setPosition] = useState('');
    const [selectedCommittees, setSelectedCommittees] = useState([]);
    const [showError, setShowError] = useState(false);
  
    const handlePositionChange = (event) => {
      setPosition(event.target.value);
    };

    const MultiStepForm = () => {
      const [selectedImage, setSelectedImage] = useState(null); // State to hold the uploaded image
      const [croppedImage, setCroppedImage] = useState(null);  // State to hold the cropped image
    
      // Handle image upload
      const handleImageUpload = (e) => {
        const file = e.target.files[0]; // Get the first file selected
        if (file) {
          setSelectedImage(URL.createObjectURL(file)); // Convert file to a URL and save it in state
        }
      };
    
      // Handle the result of the crop
      const handleCropComplete = (croppedImage) => {
        setCroppedImage(croppedImage); // Set the cropped image
      };

    

   

    const committees = [
      "Communications and Public Relations",
      "Graduate Travel Grants (GTG)",
      "Activities and Outreach",
      "Research Initiatives",
      "Rules and Procedures",
      "Student Organizational Funding",
      "Graduate Academic, and Campus Affairs (GACA)",
      "Health and Human Services (HHS)",
      "Justice, Equity, Diversity, and Inclusion (JEDI)",
      "Sustainability",
      "Graduate Advocacy Committee",
      "Charleston Committee",
      "Greenville Committee",
      "REC Committee"
    ];

    const handleSelect = (event) => {
      const { value } = event.target;

      // If the option is already selected, remove it
      if (selectedCommittees.includes(value)) {
        setSelectedCommittees(selectedCommittees.filter((item) => item !== value));
      } else if (selectedCommittees.length < 3) {
        // Add new selection if less than 3 options are selected
        setSelectedCommittees([...selectedCommittees, value]);
      } else {
        alert('You can select up to 3 committees only.');
      }
    };


    const textValidation = {
      required: "This field is required",
      pattern: {
        value: /^[A-Za-z\s]+$/, // Allow only letters and spaces
        message: "Only letters are allowed",
      },
    };
  
    const phoneValidation = {
      required: "Phone number is required",
      pattern: {
        value: /^[0-9]+$/, // Only numbers allowed
        message: "Only numbers are allowed in the phone number",
      },
      minLength: {
        value: 10,
        message: "Phone number should be at least 10 digits long",
      },
      maxLength: {
        value: 10,
        message: "Phone number should be no longer than 10 digits",
      },
    };
  
    const emailValidation = {
      required: "Clemson username is required",
      pattern: {
        value: /^[a-z]+$/, // Allow letters, numbers, dots, and underscores
        message: "Only letters are allowed for the username",
      },
    };
  
    const urlValidation = {
      required: "URL is required",
      pattern: {
        value: /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // URL with domain ending
        message: "Please enter a valid website URL (e.g., mysite.com)",
      },
    };

    
    
  
    
           

  















    // Function to handle going to the next page
    const handleNext = async () => {
      let isValid = false;
      if (step === 1) {
        isValid = await trigger(["firstName", "position", "lastName","dob","clemsonUsername","clemsonID","phoneNumber","addressLine1","city","state","zipCode","bio","picture","tshirtSize","dietaryRestrictions","college","courseType","department","program","campus","courseDelivery","position"]);
      } else if (step === 2 && position === "Cabinet Member") {
        isValid = await trigger(["title","briefBio"]);
      } else if (step === 3 && position !== "Cabinet Member") {
        isValid = await trigger(["committee"]);
      }
  
      if (isValid) {
        if (position === "Cabinet Member") {
          setStep(2); // Cabinet Members go to step 2
        } else {
          setStep(3); // Senators/Delegates go to step 3
        }
      }
    };
  
    // Function to handle going back to the previous page
    const handleBack = () => {
      // If you're in Step 3 and the position is Senator or Delegate, go back to Step 1
      if (step === 3 && (position === 'Senator' || position === 'Delegate')) {
        setStep(1);
      } else if (step > 1) {
        setStep(step - 1);
      }
    };
  
    // Function to handle form submission
    const onSubmit = (data) => {
      console.log(data);
      alert("Form submitted!");
    };

    
  
    return (
      <div className="form-container">
        <header className="header">
          <img src="C/Users/varsh/OneDrive/Pictures/Screenshots/Screenshot 2024-09-30 234059.png" alt="GSG Logo" className="gsg-logo" />
          <h1 className="form-title">GSG Members Onboarding Form</h1>
        </header>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="form">
            {/* Step 1: Basic Information */}
            {step === 1 && (
              <>
                <h2>Step 1: Basic Information</h2>
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    id="firstName"
                    {...register('firstName', textValidation,{ required: "First name is required" })}
                    placeholder="Enter your first name"
                    className="form-input"
                  />
                  {errors.firstName && <span className="error">{errors.firstName.message}</span>}
                </div>


                <div className="form-group">
                  <label htmlFor="uploadPicture">Upload Picture</label>
                  <input
                    type="file"
                    accept="image/*"
                    id="uploadPicture"
                    onChange={handleImageUpload}
                  />
                </div>

                {/* Display cropping tool if an image is selected */}
                {selectedImage && (
                  <ImageUploadAndCrop
                    imageSrc={selectedImage}
                    onCropComplete={handleCropComplete}
                  />
                )}

                {/* Display the cropped image */}
                {croppedImage && (
                  <div>
                    <h4>Cropped Image:</h4>
                    <img src={croppedImage} alt="Cropped" />
                  </div>
                )}

             
        
                

            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input id="lastName" {...register("lastName", textValidation,{ required: true })} className="form-input" placeholder="Enter last name" />
              {errors.lastName && <span className="error">Last name is required</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="dob" >Date of Birth</label>
              <input id="dob" type="date" {...register("dob", { required: true })} className="form-input" />
              {errors.dob && <span className="error">Date of birth is required</span>}
            </div>

            <div className="form-group">
              <label htmlFor="clemsonUsername">Clemson Username</label>
              <div style={{ display: 'flex' }}>
                <input
                  id="clemsonUsername"
                  {...register('clemsonUsername', emailValidation)}
                  placeholder="Enter your username"
                  className="form-input"
                  style={{ flex: 1 }}
                />
                <span style={{ marginLeft: '5px', color: '#fff' }}>@g.clemson.edu</span>
              </div>
              {errors.clemsonUsername && <span className="error">{errors.clemsonUsername.message}</span>}
            </div>

            

            <div className="form-group">
              <label htmlFor="clemsonID">Clemson ID</label>
              <input id="clemsonID"   {...register('clemsonID', { required: true })}
              placeholder="Enter your Clemson ID"
              className="form-input"
              />
              {errors.clemsonID && <span className="error">Clemson ID is required</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                id="phoneNumber"
                {...register('phoneNumber', phoneValidation, {required: true})}
                placeholder="Enter your phone number"
                className="form-input"
              />
              {errors.phoneNumber && <span className="error">{errors.phoneNumber.message}</span>}
            </div>


            
            

            <div className="form-group">
              <label htmlFor="addressLine1">Address Line 1</label>
              <input
              id="addressLine1"
              {...register('addressLine1', { required: true })}
              placeholder="Enter your address"
              className="form-input"
              />
              {errors.addressLine1 && <span className="error">Address line 1 is required</span>}
            </div>

            <div className="form-group">
              <label htmlFor="addressLine2">Address Line 2 (Optional)</label>
              <input
                id="addressLine2"
                {...register('addressLine2')}
                placeholder="Enter your address (optional)"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                id="city"
                {...register('city', { required: true })}
                placeholder="Enter your city"
                className="form-input"
              />
              {errors.city && <span className="error">City is required</span>}
            </div>

            <div className="form-group">
              <label htmlFor="state">State</label>
              <select id="state"{...register('state', { required: true })} className="form-input">
                <option value="Alabama">Alabama</option>
                <option value="Alaska">Alaska</option>
                <option value="Arizona">Arizona</option>
                <option value="Arkansas">Arkansas</option>
                <option value="California">California</option>
                <option value="Colorado">Colorado</option>
                <option value="Connecticut">Connecticut</option>
                <option value="Delaware">Delaware</option>
                <option value="Florida">Florida</option>
                <option value="Georgia">Georgia</option>
                <option value="Hawaii">Hawaii</option>
                <option value="Idaho">Idaho</option>
                <option value="Illinios">Illinios</option>
                <option value="Indiana">Indiana</option>
                <option value="Iowa">Iowa</option>
                <option value="Kansas">Kansas</option>
                <option value="Kentucky">Kentucky</option>
                <option value="Louisiana">Louisiana</option>
                <option value="Maine">Maine</option>
                <option value="Maryland">Maryland</option>
                <option value="Massachusetts">Massachuusetts</option>
                <option value="Machigan">Michigan</option>
                <option value="Minnesota">Minnesota</option>
                <option value="Mississippi">Mississippi</option>
                <option value="Missouro">Missouri</option>
                <option value="Montana">Montana</option>
                <option value="Nebraska">Nebrasaka</option>
                <option value="Nevada">Nevada</option>
                <option value="New Hampsphire">New Hampshire</option>
                <option value="New Jersey">New Jersey</option>
                <option value="New Mexico">New Mexico</option>
                <option value="New York">New York</option>
                <option value="North Carolina">North Carolina</option>
                <option value="North Dakota">Northa Dakota</option>
                <option value="Ohio">Ohio</option>
                <option value="Oklahoma">Oklahoma</option>
                <option value="Oregon">Oregon</option>
                <option value="Pennsylvania">Pennsylvania</option>
                <option value="Rhode Island">Rhode Island</option>
                <option value="South Carolina">South Carolina</option>
                <option value="South Dakota">South Dakota</option>
                <option value="Tennessee">Tennessee</option>
                <option value="Texas">Texas</option>
                <option value="Utah">Utah</option>
                <option value="Vermont">Vermont</option>
                <option value="Virginia">Virginia</option>
                <option value="Washington">Washington</option>
                <option value="West Virginia">West Virginia</option>
                <option value="Wisconsin">Wisconsin</option>
                <option value="Wyoming">Wyoming</option>
                

              </select>
              
              {errors.state && <span className="error">State is required</span>}
            </div>

            

            <div className="form-group">
              <label htmlFor="zipCode">Zip Code</label>
              <input
                id="zipCode"
                {...register('zipCode', { required: true, pattern: /\d{5}/ })}
                placeholder="Enter your zip code"
                className="form-input"
              />
              {errors.zipCode && <span className="error">Valid zip code is required</span>}
            </div>

            <div className="form-group">
              <label htmlFor="bio">Short Bio</label>
              <textarea
                  id="Bio"
                  {...register('Bio', textValidation,{ required: true })}
                  placeholder="Let us know about yourself in one line"
                  className="form-input"
                  rows="3"
                />
            </div>    
            

            {/* LinkedIn URL with predefined ending */}
            {/* LinkedIn URL with predefined starting */}
            <div className="form-group">
              <label htmlFor="linkedin">LinkedIn URL</label>
              <div style={{ display: 'flex' }}>
                <span style={{ marginRight: '5px', color: '#fff' }}>linkedin.com/in/</span>
                <input
                  type="text"
                  id="linkedin"
                  {...register('linkedin', {
                    required: "LinkedIn username is required",
                    pattern: {
                      value: /^[A-Za-z0-9]+$/,  // Only letters and numbers allowed
                      message: "Only letters and numbers are allowed for LinkedIn username",
                    },
                  })}
                  placeholder="Enter your LinkedIn username"
                  className="form-input"
                  style={{ flex: 1 }}
                />
              </div>
              {errors.linkedin && <span className="error">{errors.linkedin.message}</span>}
            </div>

            {/* Instagram URL with predefined starting */}
            <div className="form-group">
              <label htmlFor="instagram">Instagram URL</label>
              <div style={{ display: 'flex' }}>
                <span style={{ marginRight: '5px', color: '#fff' }}>instagram.com/</span>
                <input
                  type="text"
                  id="instagram"
                  {...register('instagram', {
                    required: false,
                    pattern: {
                      value: /^[A-Za-z0-9._]+$/,  // Instagram usernames can include letters, numbers, periods, and underscores
                      message: "Only letters, numbers, periods, and underscores are allowed for Instagram username",
                    },
                  })}
                  placeholder="Enter your Instagram username"
                  className="form-input"
                  style={{ flex: 1 }}
                />
              </div>
              {errors.instagram && <span className="error">{errors.instagram.message}</span>}
            </div>

            {/* Twitter URL with predefined starting */}
            <div className="form-group">
                <label htmlFor="twitter">Twitter URL</label>
                <div style={{ display: 'flex' }}>
                  <span style={{ marginRight: '5px', color: '#fff' }}>twitter.com/</span>
                  <input
                    type="text"
                    id="twitter"
                    {...register('twitter', {
                      required: false,
                      pattern: {
                        value: /^[A-Za-z0-9_]+$/,  // Twitter usernames can include letters, numbers, and underscores
                        message: "Only letters, numbers, and underscores are allowed for Twitter username",
                      },
                    })}
                    placeholder="Enter your Twitter username"
                    className="form-input"
                    style={{ flex: 1 }}
                  />
                </div>
                {errors.twitter && <span className="error">{errors.twitter.message}</span>}
              </div>

              {/* Facebook URL with predefined starting */}
              <div className="form-group">
                <label htmlFor="facebook">Facebook URL</label>
                <div style={{ display: 'flex' }}>
                  <span style={{ marginRight: '5px', color: '#fff' }}>facebook.com/</span>
                  <input
                    type="text"
                    id="facebook"
                    {...register('facebook', {
                      required: false,
                      pattern: {
                        value: /^[A-Za-z0-9.]+$/,  // Facebook usernames can include letters, numbers, and periods
                        message: "Only letters, numbers, and periods are allowed for Facebook username",
                      },
                    })}
                    placeholder="Enter your Facebook username"
                    className="form-input"
                    style={{ flex: 1 }}
                  />
                </div>
                {errors.facebook && <span className="error">{errors.facebook.message}</span>}
              </div>

              {/* Portfolio Website URL with predefined starting */}
              <div className="form-group">
                <label htmlFor="portfolio">Portfolio Website URL</label>
                <div style={{ display: 'flex' }}>
                  <span style={{ marginRight: '5px', color: '#fff' }}>https://</span>
                  <input
                    type="text"
                    id="portfolio"
                    {...register('portfolio', {
                      required: false,
                      pattern: {
                        value: /^[A-Za-z0-9.-]+$/,  // Portfolio website username can include letters, numbers, periods, and hyphens
                        message: "Only letters, numbers, periods, and hyphens are allowed for Portfolio Website",
                      },
                    })}
                    placeholder="Enter your Portfolio website (e.g., yourname.com)"
                    className="form-input"
                    style={{ flex: 1 }}
                  />
                </div>
                {errors.portfolio && <span className="error">{errors.portfolio.message}</span>}
              </div>




            {/* Picture Upload Field */}
            <div className="form-group">
              <label htmlFor="picture">Upload Picture</label>
              <input
                type="file"
                id="picture"
                {...register('picture', { required: true })}
                accept="image/*"
                className="form-input"
              />
              {errors.picture && <span className="error">A picture is required</span>}
            </div>

            {/* T-shirt Size Field */}
            <div className="form-group">
              <label htmlFor="tshirtSize">T-shirt Size</label>
              <select id="tshirtSize" {...register('tshirtSize', { required: true })} className="form-input">
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
                <option value="XXXL">XXXL</option>
              </select>
              {errors.tshirtSize && <span className="error">T-shirt size is required</span>}
            </div>

            {/* Dietary Restrictions Field */}
            <div className="form-group">
              <label htmlFor="dietaryRestrictions">Dietary Restrictions</label>
              <select id="dietaryRestrictions" {...register('dietaryRestrictions')} className="form-input">
                <option value="None">No dietary restrictions</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Vegan">Vegan</option>
                <option value="Gluten-Free">Gluten-Free</option>
                <option value="Dairy-Free">Dairy-Free</option>
                <option value="Nut Allergy">Nut Allergy</option>
                <option value="Halal">Halal</option>
                <option value="Kosher">Kosher</option>
                <option value="Other">Other</option>
              </select>
            </div>

            
            <div className="form-group">

              <label htmlFor="college">Select Your College</label>
              <select id="college" {...register('college', { required: true })} className='form-input'>
                <option value="College of Agriculture, Forestry and Life Sciences">College of Agriculture, Forestry and Life Sciences</option>
                <option value="College of Architecture, Art and Construction">College of Architecture, Art and Construction</option>
                <option value="College of Arts and Humanities">College of Arts and Humanities</option>
                <option value="College of Behavioral, Social and Health Sciences">College of Behavioral, Social and Health Sciences</option>
                <option value="College of Engineering, Computing and Applied Sciences">College of Engineering, Computing and Applied Sciences</option>
                <option value="College of Education">College of Education</option>
                <option value="College of Science">College of Science</option>
                <option value="Wilbur O. and Ann Powers College of Business">Wilbur O. and Ann Powers College of Business</option>
                <option value="College of Veterinary Medicine">College of Veterinary Medicine</option>
              </select>
            {errors.college && <p>College is required.</p>}
            </div>
            <div className="form-group">

             {/* Course Type */}
              <label htmlFor="courseType">Course Type:</label>
              <select id="courseType" {...register('courseType', { required: true })} className='form-input' >
                <option value="Doctorate">Doctorate</option>
                <option value="Masters">Masters</option>
              </select>
            </div>

            <div className="form-group">

            {/* Department Field */}
              <label htmlFor="department">Select Your Department or School</label>
              <select {...register('department', { required: true })} id="department" className='form-input'>
                <option value="Department of Art">Department of Art</option>
                <option value="Department of Management">Department of Management</option>
                <option value="School of Accountancy">School of Accountancy</option>
                <option value="School of Architecture">School of Architecture</option>
                <option value="School of Mathematical and Statistical Sciences">School of Mathematical and Statistical Sciences</option>
                <option value="Department of Agricultural Sciences">Department of Agricultural Sciences</option>
                <option value="Department of Animal and Veterinary Sciences">Department of Animal and Veterinary Sciences</option>
                <option value="Department of Automotive Engineering">Department of Automotive Engineering</option>
              {/* Add all other department options here */}
            </select>
            {errors.department && <p>Department is required.</p>}
            </div>

            

            <div className="form-group">
              <label htmlFor="program">Select your Program</label>
              <select {...register('program', { required: true })}  id="program" className='form-input'>

                <option value="Accounting (M.P.Acc.)">Accounting (M.P.Acc.)</option>
                <option value="Agricultural and Applied Economics (M.S.)">Agricultural and Applied Economics (M.S.)</option>
                <option value="Agricultural Education (M.Ag.Ed.)">Agricultural Education (M.Ag.Ed.)</option>
                <option value="Agriculture (M.S., Ph.D.)">Agriculture (M.S., Ph.D.)</option>
                <option value="Animal and Veterinary Sciences (M.S., Ph.D.)">Animal and Veterinary Sciences (M.S., Ph.D.)</option>
                <option value="Applied Computing (M.A.C.)">Applied Computing (M.A.C.)</option>
                <option value="Applied Health Research and Evaluation (M.S., Ph.D.)">Applied Health Research and Evaluation (M.S., Ph.D.)</option>
                <option value="Applied Psychology (M.S.)">Applied Psychology (M.S.)</option>
                
              </select>
                                






            </div>





            <div className="form-group">

            {/* Campus Field */}
              <label htmlFor="campus">Select Your Campus</label>
              <select {...register('campus', { required: true })} id="campus"className='form-input'>
                <option value="Clemson Main Campus">Clemson Main Campus</option>
                <option value="Clemson Greenville ONE">Clemson Greenville ONE</option>
                <option value="Clemson University International Center for Automotive Research (CU-ICAR)">Clemson University International Center for Automotive Research (CU-ICAR)</option>
                <option value="Zucker Family Graduate Education Center">Zucker Family Graduate Education Center</option>
                <option value="Clemson BIOE">Clemson BIOE</option>
                <option value="CU School of Nursing">CU School of Nursing</option>
              </select>
            {errors.campus && <p>Campus is required.</p>}
            </div>

            
  
            <div className="form-group">
            <label htmlFor="courseDelivery">Select your Method of Course Delivery:</label>
              <select { ...register('courseDelivery', { required: true })} id="courseDelivery"className='form-input'>
                <option value="In-Person">In-Person (Charleston, Greenville, Clemson Main Campus)</option>
                <option value="Online">Online / Virtual Program</option>
              </select>
              {errors.courseDelivery && <p>Course Delivery is required.</p>}
            </div>     

            
            <div className="form-group">
                {/* Position */}
                <label htmlFor="position">Select your Position:</label>
                <select
                  {...register('position', { required: true })}
                  id="position"
                  className="form-input"
                  onChange={handlePositionChange} // Attach the handlePositionChange
                >
                  <option value="">Select Position</option>
                  <option value="Cabinet Member">Cabinet Member</option>
                  <option value="Senator">Senator</option>
                  <option value="Delegate">Delegate</option>
                </select>
                {errors.position && <span className="error">Position is required.</span>}
              </div>

              <div className="form-navigation">
                <button className="small-button back-button" type="button" onClick={handleBack}>Back</button>
                <button className="small-button next-button" type="button" onClick={handleNext}>Next</button>
              </div>
            </>
          )}
  
            {/* Step 2: Cabinet Member Additional Info */}
            {step === 2 && position === 'Cabinet Member' && (
              <>
                <h2>Step 2: Additional Information for Cabinet Members</h2>

                <div className="form-group">
                  <label htmlFor="briefBio">Brief Bio</label>
                  <textarea
                    id="briefBio"
                    {...register('briefBio',{required: "Bio is required"})}
                    placeholder="Tell us more detailed about yourself"
                    className="form-input"
                    rows="4"
                  />
                  {errors.briefBio && <span className="error">Bio is required.</span>}
                </div>


                <div className="form-group">
                  <label htmlFor="title">Select your Title:</label>
                  <select { ...register('title', { required: true })} id="title"className='form-input'>
                    <option value="President">President</option>
                    <option value="Secretary">Secretary</option>
                    <option value="Vice President">Vice President</option>
                    <option value="Chief of Staff">Chief of Staff</option>
                    <option value="Treasurer">Treasurer</option>
                    <option value="Senate President">Senate President</option>
                    <option value="Webmaster">Webmaster</option>
                    <option value="Deputy Webmaster">Deputy Webmaster</option>
                    <option value="Director of Communications">Director of Communications</option>
                    <option value="Deputy Director of Communications">Deputy Director of Communications </option>
                    <option value="Director of Rules and Procedures">Director of Rules and Procedures</option>
                    <option value="Director of Student Organizational Funding">Director of Student Organizational Funding</option>
                    <option value="Director of Research Initiatives">Director of Research Initiatives                    </option>
                    <option value="Deputy Director of Research Initiatives">Deputy Director of Research Initiatives</option>
                    <option value="Director of Activities">Director of Activities</option>
                    <option value="Deputy Director of Activities">Deputy Director of Activities</option>
                    <option value="Director of Justice, Equity, Diversity, and Inclusion (JEDI)">Director of Justice, Equity, Diversity, and Inclusion (JEDI)</option>
                    <option value="Deputy Director of Justice, Equity, Diversity, and Inclusion (JEDI)">Deputy Director of Justice, Equity, Diversity, and Inclusion (JEDI)                    </option>
                    <option value="Director of Graduate Travel Grants">Director of Graduate Travel Grants</option>
                    <option value="Joint Director of Graduate Travel Grants">Joint Director of Graduate Travel Grants                    </option>
                    <option value="Deputy Director of Graduate Travel Grants">Deputy Director of Graduate Travel Grants                    </option>
                    <option value="Director of Health and Human Services">Director of Health and Human Services                    </option>
                    <option value="Director of Sustainability">Director of Sustainability</option>
                    <option value="Director of Graduate, Academic and Campus Affairs (GACA)">Director of Graduate, Academic and Campus Affairs (GACA)</option>
                    <option value="Deputy Director of Graduate, Academic and Campus Affairs (GACA)">Deputy Director of Graduate, Academic and Campus Affairs (GACA)</option>
                    <option value="Director of Greenville">Director of Greenville</option>
                    <option value="Director of Florence">Director of Florence</option>
                    <option value="Director of Charleston">Director of Charleston</option>
                    
                  </select>
                  {errors.title && <p>Title is required.</p>}
                </div>     

                <div className="form-navigation">
                <button className="small-button back-button" type="button" onClick={handleBack}>
                  Back
                </button>
                <button type="submit" className="small-button submit-button">
                  Submit
                </button>
              </div>
              </>
            )}
  
            {/* Step 3: Final Details */}
            {step === 3 && (
              <>
                <h2>Step 3: Final Details</h2>
                
                <div>
                <h3>Select the GSG Committee You'd Like to Be a Part of</h3>
                <p>
                  More Information about Committees Can be Found under Page 10 in our Roster or in the GSG Constitution. Please select at most 3 options.
                </p>
                <div>
                  {committees.map((committee) => (
                    <div key={committee}>
                      <label>
                        <input
                          type="checkbox"
                          value={committee}
                          onChange={handleSelect}
                          checked={selectedCommittees.includes(committee)}
                        />
                        {committee}
                      </label>
                    </div>
                  ))}
                </div>
                <p>Selected Committees: {selectedCommittees.join(', ')}</p>
              </div>
              {selectedCommittees.length === 0 && showError && (
                  <p className="error" style={{ color: 'red' }}>
                    Please select at least one committee.
                  </p>
                )}
  
                
              <div className="form-navigation">
                <button className="small-button back-button" type="button" onClick={handleBack}>
                  Back
                </button>
                <button type="submit" className="small-button submit-button">
                  Submit
                </button>
              </div>
            </>
          )}
        </form>
      </FormProvider>
    </div>
    );
  }
}
  
  export default MultiStepForm;
  
            
  
 

              

             
              

  

  



























           
            

            

          