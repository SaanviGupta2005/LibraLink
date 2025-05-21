-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: bookstore
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `id` int NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'admin','admin');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `books` (
  `book_id` int NOT NULL AUTO_INCREMENT,
  `book_name` text COLLATE utf8mb4_general_ci NOT NULL,
  `book_category` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `book_author` text COLLATE utf8mb4_general_ci NOT NULL,
  `book_desc` varchar(1000) COLLATE utf8mb4_general_ci NOT NULL,
  `book_img` varchar(255) COLLATE utf8mb4_general_ci DEFAULT 'default.jpg',
  `book_price` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `book_quantity` int NOT NULL,
  `book_purchase` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`book_id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (1,'The Great Gatsby','Thriller','F. Scott Fitzgerald','The story of the fabulously Wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.','1747741156703.jpg','150',16,6),(2,'To Kill a Mockingbird','Thriller','Harper Lee','A gripping, heart-wrenching, and wholly remarkable tale of coming-of-age in a South poisoned by virulent prejudice.','1747653354726.webp','120',14,8),(3,'1984','Fiction','George Orwell','A dystopian novel set in Airstrip One, formerly Great Britain, a province of the superstate Oceania.','1747653368889.jpg','450',16,9),(4,'Pride and Prejudice','Romance','Jane Austen','A romantic novel of manners written by Jane Austen in 1813.','1747653404415.jpeg','350',20,0),(5,'The Catcher in the Rye','Mystery','J.D. Salinger','A story by J. D. Salinger, partially published in serial form in 1945–1946 and as a novel in 1951.','1747653447855.jpeg','375',10,7),(6,'Harry Potter and the Philosopher\'s Stone','Fantasy','J.K. Rowling','The story of a young boy who discovers that he is a wizard.','1747653514260.jpeg','255',19,0),(7,'The Hobbit','Fantasy','J.R.R. Tolkien','A children\'s fantasy novel by English author J. R. R. Tolkien.','1747653574699.jpg','345',20,0),(8,'The Lord of the Rings','Mystery','J.R.R. Tolkien','An epic high-mystery novel by English author and scholar J. R. R. Tolkien.','1747653626218.jpg','550',10,0),(9,'The Da Vinci Code','Thriller','Dan Brown','A mystery thriller novel by Dan Brown.','1747653667992.jpg','175',30,0),(10,'The Alchemist','Young Adult','Paulo Coelho','The story of Santiago, an Andalusian shepherd boy who yearns to travel in search of a worldly treasure.','1747653722582.jpeg','340',15,0),(11,'Object Oriented Programming with C++','Science & Technology','Balagurusamy E.','a comprehensive book for undergraduate students of computer science studying an first course on the C++ programming language. The book covers the principles of Object Oriented Programming before moving onto C++ syntax and programming constructs','1747653829059.webp','200',17,0),(18,'Barbie','Kids','Parragon ','Join Brooklyn Barbie and Malibu Barbie on their adventures in this collection of short stories. From meeting people of underground network that trades hard-to-find music to rescuing a parrot on a camping trip and making a magic show a big hit, it\'s been no less than a roller-coaster ride for them.','1747631173540.jpg','450',18,0),(19,'R.K. Narayan – The Guide','Education','R.K. Narayan','R.K Narayan is best known for stories based in and around the fictional village of Malgudi.','1747653895044.jpg','150',10,0),(20,'Machine Learning Yearning','Science & Technology','Andrew Ng','AI, machine learning, and deep learning are transforming numerous industries.','1747653970828.jpg','195',12,0),(40,'108 Panchatantra Stories (Illustrated) - Story Book','Kids','Maple Press ','Depicting the ‘five principle conduct’ about life, The Panchatantra Stories are timeless classics. Readers of all age groups enjoy reading and re-reading the Panchatantra Stories as they impart profound wisdom and moral values about the conduct of life through simple narratives. Written in their present form by Pandit Vishnu Sharma, the Panchatantra Stories were narrated to impart worldly wisdom to king Amar shakti three sons.','1747631038792.jpg','350',30,0),(41,'Dawn of the Trade: An Action Adventure Series','Action','Jarrett Mazza','After years of serving his country overseas, former Marine Jon Haze returns to the familiar streets of Queens, New York, with hopes of reconnecting with his roots and finding peace in the aftermath of war. Yet, peace remains elusive for the 24-year-old veteran, who feels more lost than ever in the civilian world.','1747654080525.jpeg','300',20,0),(42,'Osprey: an action-adventure techonthriller','Action','M. L. Buchman','World War I began with the assassination of Archduke Ferdinand. World War II launched with the invasion of Poland. Russia’s invasion of Ukraine didn’t do it—yet.\r\n\r\nA close flyby of an American CMV-22 Osprey tiltrotor goes desperately wrong over the North Sea. Will the tipping point for World War III break the moment a favored daughter of the Oligarchy goes down in flames?','1747654155460.jpg','350',15,0),(43,'Horrors Of The Night','Horror','Tom Coleman','Horrors of the Night is a collection of short Mysterious, Psychological, Suspense, and Horror stories that will make you shiver and sleep with your lights on. Some of the stories are inspired by true events and some are inspired by ideas of my dear readers! Find out which ones inside this scary collection.','1747654257986.jpg','115',25,0),(44,'Haunted','Horror','Chuck Palahniuk','Haunted is a novel made up of stories: twenty-three of the most horrifying, hilarious, mind-blowing, stomach-churning tales you\'ll ever encounter. They are told by the people who have all answered an ad headlined \'Artists Retreat: Abandon your life for three months\'. They are led to believe that here they will leave behind all the distractions of \'real life\' that are keeping them from creating the masterpiece that is in them.','1747654377392.jpeg','220',14,0),(45,'The Notebook','Romance','Nicholas Sparks','Every so often a love story so captures our hearts that it becomes more than a story-it becomes an experience to remember forever. The Notebook is such a book. It is a celebration of how passion can be ageless and timeless, a tale that moves us to laughter and tears and makes us believe in true love all over again...','1747654466141.jpeg','450',50,0),(46,'The Gruffalo','Kids','Julia Donaldson','It features the classic story with a stunning redesigned cover and beautiful finish, making it a must-have for even the smallest Donaldson and Scheffler fans! Also available in board book format and with striking redesigned covers are: The Gruffalo\'s Child, Room on the Broom, The Snail and the Whale, The Smartest Giant in Town, Monkey Puzzle, Charlie Cook\'s Favourite Book, and A Squash and a Squeeze.','1747655196029.jpg','300',15,0),(49,'The Mussoorie Murders','Crime','Divyaroop Bhatnagar','Mussoorie, 1909. The ghastly murder of Margaret Maynard Liddell in a hotel room locked from the inside shocks the public. Its ripples reach Sir Arthur Conan Doyle and Rudyard Kipling, who can only guess the identity of the killer but never prove it.','1747753853474.jpg','250',20,0);
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `order_details` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `order_quantity` int NOT NULL,
  `order_price` int NOT NULL,
  `order_email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `order_phone` bigint NOT NULL,
  `order_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`order_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (6,12,'To Kill a Mockingbird (x1), Harry Potter and the Philosopher\'s Stone (x1), Machine Learning (x1)',3,37,'guptasaanvi2005@gmail.com',7015714338,'2025-03-04 14:42:37'),(7,13,'1984 (x1), The Catcher in the Rye (x1)',2,21,'abc@gmail.com',7015714338,'2025-03-04 14:45:15'),(8,12,'',0,0,'guptasaanvi2005@gmail.com',7015714338,'2025-04-02 04:49:13'),(9,12,'To Kill a Mockingbird (x1), Harry Potter and the Philosopher\'s Stone (x1)',2,27,'guptasaanvi2005@gmail.com',7015714338,'2025-05-07 06:44:26'),(10,12,'1984 (x1), The Great Gatsby (x1)',2,25,'guptasaanvi2005@gmail.com',7015714338,'2025-05-07 06:54:12'),(11,12,'The Catcher in the Rye (x1), c++ (x2)',3,51,'guptasaanvi2005@gmail.com',7015714338,'2025-05-07 06:57:19'),(12,12,'Barbie (x1), Pride and Prejudice (x1), The Hobbit (x1)',3,32,'guptasaanvi2005@gmail.com',7015714338,'2025-05-19 03:15:56');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reading_status`
--

DROP TABLE IF EXISTS `reading_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reading_status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `book_id` int NOT NULL,
  `status` enum('Reading','Completed','Want to Read') NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_reading_status` (`user_id`,`book_id`),
  KEY `book_id` (`book_id`),
  CONSTRAINT `reading_status_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `reading_status_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `books` (`book_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reading_status`
--

LOCK TABLES `reading_status` WRITE;
/*!40000 ALTER TABLE `reading_status` DISABLE KEYS */;
INSERT INTO `reading_status` VALUES (1,12,2,'Reading','2025-05-19 10:05:17','2025-05-19 10:24:47'),(6,12,5,'Want to Read','2025-05-19 10:09:52','2025-05-19 10:13:10'),(7,12,3,'Completed','2025-05-19 10:10:03','2025-05-19 10:10:03');
/*!40000 ALTER TABLE `reading_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `review_id` int NOT NULL AUTO_INCREMENT,
  `book_id` int NOT NULL,
  `user_id` int NOT NULL,
  `rating` int NOT NULL,
  `review_text` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`review_id`),
  UNIQUE KEY `unique_user_book_review` (`user_id`,`book_id`),
  KEY `book_id` (`book_id`),
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `books` (`book_id`) ON DELETE CASCADE,
  CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `reviews_chk_1` CHECK (((`rating` >= 1) and (`rating` <= 5)))
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (1,2,12,4,'nice book','2025-05-19 09:37:40','2025-05-19 09:38:19');
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `city` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `phone` bigint NOT NULL,
  `gender` varchar(10) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Yash','yash@gmail.com','yash','Pune',1234512345,'M'),(12,'Saanvi Gupta','guptasaanvi2005@gmail.com','$2b$10$aL3GKPGG28tQZ4M61GPNR.NzPLofdoK1KqrHxn9QuNLTklpi/aINm','Ambala City',7015714338,'female'),(13,'ABC','abc@gmail.com','$2b$10$7yY4wYon4UpnnybtJxsX1eMmLREajurZ3MkYD3IDQUdaFZxwoJLs6','Patiala',8956789022,'male');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-21 19:25:40
