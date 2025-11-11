// src/data/indiaDistricts.js
// Manual mapping: State → District list
// Use: import INDIA_DISTRICTS from "../data/indiaDistricts";

const INDIA_DISTRICTS = {
  "Andhra Pradesh": [
    "Anakapalli","Anantapur","Annamayya","Bapatla","Chittoor","Dr. B.R. Ambedkar Konaseema",
    "East Godavari","Eluru","Guntur","Kadapa","Kakinada","Krishna","Kurnool","Nandyal",
    "Nellore","Palnadu","Parvathipuram Manyam","Prakasam","Srikakulam","Tirupati",
    "Visakhapatnam","Vizianagaram","West Godavari"
  ],

  "Telangana": [
    "Adilabad","Bhadradri Kothagudem","Hanumakonda","Hyderabad","Jagtial","Jangaon",
    "Jayashankar Bhupalpally","Jogulamba Gadwal","Kamareddy","Karimnagar","Khammam",
    "Komaram Bheem Asifabad","Mahabubabad","Mahabubnagar","Mancherial","Medak",
    "Medchal–Malkajgiri","Mulugu","Nagarkurnool","Nalgonda","Nirmal","Nizamabad",
    "Peddapalli","Rajanna Sircilla","Ranga Reddy","Sangareddy","Siddipet","Suryapet",
    "Vikarabad","Wanaparthy","Warangal","Yadadri Bhuvanagiri"
  ],

  "Karnataka": [
    "Bagalkote","Ballari","Belagavi","Bengaluru Rural","Bengaluru Urban","Bidar",
    "Chamarajanagar","Chikkaballapur","Chikkamagaluru","Chitradurga","Dakshina Kannada",
    "Davanagere","Dharwad","Gadag","Hassan","Haveri","Kalaburagi","Kodagu","Kolar",
    "Koppal","Mandya","Mysuru","Raichur","Ramanagara","Shivamogga","Tumakuru","Udupi",
    "Uttara Kannada","Vijayapura","Yadgir"
  ],

  "Maharashtra": [
    "Ahmednagar","Akola","Amravati","Aurangabad (Chhatrapati Sambhajinagar)","Beed",
    "Bhandara","Buldhana","Chandrapur","Dhule","Gadchiroli","Gondia","Hingoli","Jalgaon",
    "Jalna","Kolhapur","Latur","Mumbai City","Mumbai Suburban","Nagpur","Nanded","Nandurbar",
    "Nashik","Osmanabad (Dharashiv)","Palghar","Parbhani","Pune","Raigad","Ratnagiri",
    "Sangli","Satara","Sindhudurg","Solapur","Thane","Wardha","Washim","Yavatmal"
  ],

  "Tamil Nadu": [
    "Ariyalur","Chengalpattu","Chennai","Coimbatore","Cuddalore","Dharmapuri","Dindigul",
    "Erode","Kallakurichi","Kancheepuram","Karur","Krishnagiri","Madurai","Mayiladuthurai",
    "Nagapattinam","Namakkal","Nilgiris","Perambalur","Pudukkottai","Ramanathapuram",
    "Ranipet","Salem","Sivaganga","Tenkasi","Thanjavur","Theni","Thoothukudi","Tiruchirappalli",
    "Tirunelveli","Tirupathur","Tiruppur","Tiruvallur","Tiruvannamalai","Tiruvarur",
    "Vellore","Viluppuram","Virudhunagar"
  ],

  "Uttar Pradesh": [
    "Agra","Aligarh","Ambedkar Nagar","Amethi","Amroha","Auraiya","Ayodhya","Azamgarh",
    "Badaun","Baghpat","Bahraich","Ballia","Balrampur","Banda","Barabanki","Bareilly","Basti",
    "Bijnor","Bulandshahr","Chandauli","Chitrakoot","Deoria","Etah","Etawah","Farrukhabad",
    "Fatehpur","Firozabad","Gautam Buddha Nagar","Ghaziabad","Ghazipur","Gonda","Gorakhpur",
    "Hamirpur","Hapur","Hardoi","Hathras","Jalaun","Jaunpur","Jhansi","Kannauj","Kanpur Dehat",
    "Kanpur Nagar","Kasganj","Kaushambi","Kheri","Kushinagar","Lalitpur","Lucknow","Maharajganj",
    "Mahoba","Mainpuri","Mathura","Mau","Meerut","Mirzapur","Moradabad","Muzaffarnagar",
    "Pilibhit","Pratapgarh","Prayagraj","Raebareli","Rampur","Saharanpur","Sambhal","Sant Kabir Nagar",
    "Shahjahanpur","Shamli","Shravasti","Siddharthnagar","Sitapur","Sonbhadra","Sultanpur",
    "Unnao","Varanasi"
  ],

  "West Bengal": [
    "Alipurduar","Bankura","Birbhum","Cooch Behar","Dakshin Dinajpur","Darjeeling",
    "Hooghly","Howrah","Jalpaiguri","Jhargram","Kalimpong","Kolkata","Malda","Murshidabad",
    "Nadia","North 24 Parganas","Paschim Bardhaman","Paschim Medinipur","Purba Bardhaman",
    "Purba Medinipur","Purulia","South 24 Parganas","Uttar Dinajpur"
  ],
  // ---- Continue inside your INDIA_DISTRICTS object ----

  "Arunachal Pradesh": [
    "Anjaw","Changlang","Dibang Valley","East Kameng","East Siang","Kamle","Kra Daadi",
    "Kurung Kumey","Lepa Rada","Lohit","Longding","Lower Dibang Valley","Lower Siang",
    "Lower Subansiri","Namsai","Pakke-Kessang","Papum Pare","Shi Yomi","Siang",
    "Tawang","Tirap","Upper Siang","Upper Subansiri","West Kameng","West Siang"
  ],

  "Assam": [
    "Baksa","Barpeta","Biswanath","Bongaigaon","Cachar","Charaideo","Chirang","Darrang",
    "Dhemaji","Dhubri","Dibrugarh","Goalpara","Golaghat","Hailakandi","Hojai","Jorhat",
    "Kamrup","Kamrup Metropolitan","Karbi Anglong","Karimganj","Kokrajhar","Lakhimpur",
    "Majuli","Morigaon","Nagaon","Nalbari","Sivasagar","Sonitpur","South Salmara-Mankachar",
    "Tinsukia","Udalguri","West Karbi Anglong"
  ],

  "Bihar": [
    "Araria","Arwal","Aurangabad","Banka","Begusarai","Bhagalpur","Bhojpur","Buxar",
    "Darbhanga","East Champaran","Gaya","Gopalganj","Jamui","Jehanabad","Kaimur",
    "Katihar","Khagaria","Kishanganj","Lakhisarai","Madhepura","Madhubani","Munger",
    "Muzaffarpur","Nalanda","Nawada","Patna","Purnia","Rohtas","Saharsa","Samastipur",
    "Saran","Sheikhpura","Sheohar","Sitamarhi","Siwan","Supaul","Vaishali","West Champaran"
  ],

  "Chhattisgarh": [
    "Balod","Baloda Bazar","Balrampur","Bastar","Bemetara","Bijapur","Bilaspur","Dantewada",
    "Dhamtari","Durg","Gariaband","Gaurela-Pendra-Marwahi","Janjgir-Champa","Jashpur",
    "Kabirdham","Kanker","Kondagaon","Korba","Koriya","Mahasamund","Mungeli","Narayanpur",
    "Raigarh","Raipur","Rajnandgaon","Sukma","Surajpur","Surguja"
  ],

  "Goa": ["North Goa","South Goa"],

  "Gujarat": [
    "Ahmedabad","Amreli","Anand","Aravalli","Banaskantha","Bharuch","Bhavnagar",
    "Botad","Chhota Udaipur","Dahod","Dang","Devbhoomi Dwarka","Gandhinagar",
    "Gir Somnath","Jamnagar","Junagadh","Kheda","Kutch","Mahisagar","Mehsana",
    "Morbi","Narmada","Navsari","Panchmahal","Patan","Porbandar","Rajkot","Sabarkantha",
    "Surat","Surendranagar","Tapi","Vadodara","Valsad"
  ],

  "Haryana": [
    "Ambala","Bhiwani","Charkhi Dadri","Faridabad","Fatehabad","Gurugram","Hisar",
    "Jhajjar","Jind","Kaithal","Karnal","Kurukshetra","Mahendragarh","Nuh","Palwal",
    "Panchkula","Panipat","Rewari","Rohtak","Sirsa","Sonipat","Yamunanagar"
  ],

  "Himachal Pradesh": [
    "Bilaspur","Chamba","Hamirpur","Kangra","Kinnaur","Kullu","Lahaul and Spiti",
    "Mandi","Shimla","Sirmaur","Solan","Una"
  ],

  "Jharkhand": [
    "Bokaro","Chatra","Deoghar","Dhanbad","Dumka","East Singhbhum","Garhwa","Giridih",
    "Godda","Gumla","Hazaribagh","Jamtara","Khunti","Koderma","Latehar","Lohardaga",
    "Pakur","Palamu","Ramgarh","Ranchi","Sahebganj","Seraikela Kharsawan","Simdega",
    "West Singhbhum"
  ],

  "Kerala": [
    "Alappuzha","Ernakulam","Idukki","Kannur","Kasaragod","Kollam","Kottayam","Kozhikode",
    "Malappuram","Palakkad","Pathanamthitta","Thiruvananthapuram","Thrissur","Wayanad"
  ],

  "Madhya Pradesh": [
    "Agar Malwa","Alirajpur","Anuppur","Ashoknagar","Balaghat","Barwani","Betul","Bhind",
    "Bhopal","Burhanpur","Chhatarpur","Chhindwara","Damoh","Datia","Dewas","Dhar","Dindori",
    "Guna","Gwalior","Harda","Hoshangabad","Indore","Jabalpur","Jhabua","Katni","Khandwa",
    "Khargone","Mandla","Mandsaur","Morena","Narsinghpur","Neemuch","Niwari","Panna",
    "Raisen","Rajgarh","Ratlam","Rewa","Sagar","Satna","Sehore","Seoni","Shahdol","Shajapur",
    "Sheopur","Shivpuri","Sidhi","Singrauli","Tikamgarh","Ujjain","Umaria","Vidisha"
  ],

  "Manipur": [
    "Bishnupur","Chandel","Churachandpur","Imphal East","Imphal West","Jiribam","Kakching",
    "Kamjong","Kangpokpi","Noney","Pherzawl","Senapati","Tamenglong","Tengnoupal","Thoubal",
    "Ukhrul"
  ],

  "Meghalaya": [
    "East Garo Hills","East Jaintia Hills","East Khasi Hills","North Garo Hills",
    "Ri Bhoi","South Garo Hills","South West Garo Hills","South West Khasi Hills",
    "West Garo Hills","West Jaintia Hills","West Khasi Hills"
  ],

  "Mizoram": [
    "Aizawl","Champhai","Hnahthial","Khawzawl","Kolasib","Lawngtlai","Lunglei",
    "Mamit","Saiha","Saitual","Serchhip"
  ],

  "Nagaland": [
    "Chümoukedima","Dimapur","Kiphire","Kohima","Longleng","Mokokchung","Mon",
    "Niuland","Noklak","Peren","Phek","Shamator","Tseminyu","Tuensang","Wokha","Zünheboto"
  ],

  "Odisha": [
    "Angul","Balangir","Balasore","Bargarh","Bhadrak","Boudh","Cuttack","Deogarh",
    "Dhenkanal","Gajapati","Ganjam","Jagatsinghpur","Jajpur","Jharsuguda","Kalahandi",
    "Kandhamal","Kendrapara","Kendujhar","Khordha","Koraput","Malkangiri","Mayurbhanj",
    "Nabarangpur","Nayagarh","Nuapada","Puri","Rayagada","Sambalpur","Subarnapur","Sundargarh"
  ],

  "Punjab": [
    "Amritsar","Barnala","Bathinda","Faridkot","Fatehgarh Sahib","Fazilka","Ferozepur",
    "Gurdaspur","Hoshiarpur","Jalandhar","Kapurthala","Ludhiana","Malerkotla","Mansa",
    "Moga","Muktsar","Pathankot","Patiala","Rupnagar","Sangrur","SAS Nagar (Mohali)",
    "SBS Nagar (Nawanshahr)","Tarn Taran"
  ],

  "Rajasthan": [
    "Ajmer","Alwar","Anupgarh","Balotra","Baran","Barmer","Bharatpur","Bhilwara","Bikaner",
    "Bundi","Chittorgarh","Dausa","Dholpur","Dungarpur","Hanumangarh","Jaipur","Jaisalmer",
    "Jalore","Jhalawar","Jhunjhunu","Jodhpur","Karauli","Kota","Nagaur","Pali","Pratapgarh",
    "Rajsamand","Sawai Madhopur","Sikar","Sirohi","Sri Ganganagar","Tonk","Udaipur"
  ],

  "Sikkim": [
    "Gangtok","Gyalshing (West Sikkim)","Mangan (North Sikkim)","Namchi (South Sikkim)",
    "Pakyong","Soreng"
  ],

  "Tripura": [
    "Dhalai","Gomati","Khowai","North Tripura","Sepahijala","South Tripura","Unakoti",
    "West Tripura"
  ],

  "Uttarakhand": [
    "Almora","Bageshwar","Chamoli","Champawat","Dehradun","Haridwar","Nainital",
    "Pauri Garhwal","Pithoragarh","Rudraprayag","Tehri Garhwal","Udham Singh Nagar",
    "Uttarkashi"
  ]
};


export default INDIA_DISTRICTS;
