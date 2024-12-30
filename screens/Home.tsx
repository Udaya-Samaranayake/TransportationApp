import { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

type Vehicle = {
  id: number;
  make: string;
  model: string;
  year: number;
  vehicleType: string;
  fuelType?: string;
  thumbnail: any;
  price: number;
  description: string;
};

export default function HomePage() {
  const router = useRouter();
  const { username } = useLocalSearchParams();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [cart, setCart] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const makesResponse = await fetch(
        "https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json"
      );
      const makesData = await makesResponse.json();

      const topMakes = ["Honda", "Toyota", "Ford", "BMW", "Mercedes-Benz"];

      let allVehicles: Vehicle[] = [];
      for (const make of topMakes) {
        const modelsResponse = await fetch(
          `https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${make}?format=json`
        );
        const modelsData = await modelsResponse.json();

        const vehicles = modelsData.Results.slice(0, 3).map(
          (model: any, index: number) => ({
            id: allVehicles.length + index + 1,
            make: model.Make_Name,
            model: model.Model_Name,
            year: 2024,
            vehicleType: model.Vehicle_Type || "Not Specified",
            fuelType: "Gasoline",
            thumbnail: getVehicleImage(model.Make_Name, model.Model_Name),
            price: Math.floor(Math.random() * (80000 - 25000) + 25000),
            description: `The ${model.Make_Name} ${model.Model_Name} combines style, performance, and reliability.`,
          })
        );

        allVehicles = [...allVehicles, ...vehicles];
      }

      setVehicles(allVehicles);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      Alert.alert("Error", "Failed to load vehicles. Please try again later.");
      setLoading(false);
    }
  };

  const getVehicleImage = (make: string, model: string): any => {
    const images: Record<string, any> = {
      "Honda Civic": require("../assets/images/01.jpeg"),
      "Honda Accord": require("../assets/images/02.jpeg"),
      "Honda Pilot": require("../assets/images/03.jpeg"),
      "Toyota Scion xA": require("../assets/images/04.jpeg"),
      "Toyota Scion tC": require("../assets/images/05.jpeg"),
      "Toyota Corolla": require("../assets/images/06.jpeg"),
      "Ford Crown Victoria": require("../assets/images/07.jpeg"),
      "Ford Focus": require("../assets/images/08.jpeg"),
      "Ford Fusion": require("../assets/images/09.jpeg"),
      "BMW 128i": require("../assets/images/10.jpeg"),
    };

    const key = `${make} ${model}`;
    return (
      images[key] ||
      `https://source.unsplash.com/800x600/?car,${make},${model.replace(
        / /g,
        ""
      )}`
    );
  };

  const handleAddToCart = (item: Vehicle) => {
    setCart((prevCart) => [...prevCart, item]);
    Alert.alert("Success", `${item.make} ${item.model} added to the cart.`);
  };

  const handleRemoveFromCart = (itemId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
    Alert.alert("Removed", "Item has been removed from the cart.");
  };

  const renderItem = ({ item }: { item: Vehicle }) => {
    return (
      <View style={styles.productCard}>
        <Image source={item.thumbnail} style={styles.productImage} />
        <View style={styles.productInfo}>
          <Text style={styles.productTitle}>
            {item.make} {item.model}
          </Text>
          <Text style={styles.productType}>
            {item.vehicleType} • {item.year}
          </Text>
          <Text style={styles.productPrice}>
            ${item.price.toLocaleString()}
          </Text>

          <Text style={styles.productDescription} numberOfLines={2}>
            {item.description}
          </Text>

          <View style={styles.actionButtons}>
            <TouchableOpacity
              onPress={() => handleAddToCart(item)}
              style={styles.addToCartButton}
            >
              <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <ImageBackground style={styles.backgroundImage} resizeMode="cover">
      <View style={styles.overlay} />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>
            Welcome, {username ? username : "Udaya Samaranayake"} 👋
          </Text>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading vehicles...</Text>
          </View>
        ) : (
          <FlatList
            data={vehicles}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContainer}
          />
        )}

        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => {
            router.push({
              pathname: "/cart",
              params: { cart: JSON.stringify(cart) },
            });
          }}
        >
          <Ionicons name="cart" size={24} color="white" />
          <Text style={styles.cartButtonText}>Cart: {cart.length}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#444",
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    color: "#bbb",
  },
  listContainer: {
    padding: 10,
  },
  productCard: {
    backgroundColor: "#f2f2f2",
    marginBottom: 15,
    borderRadius: 10,
    overflow: "hidden",
    elevation: 2,
  },
  productImage: {
    width: "100%",
    height: 150,
  },
  productInfo: {
    padding: 10,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  productType: {
    fontSize: 14,
    color: "#666",
    marginVertical: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#EAB308",
    marginVertical: 5,
  },
  productDescription: {
    fontSize: 14,
    color: "#333",
    marginVertical: 5,
  },
  actionButtons: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
  },
  addToCartButton: {
    backgroundColor: "#EAB308",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
  cartButton: {
    flexDirection: "row",
    backgroundColor: "#EAB308",
    position: "absolute",
    bottom: 20,
    right: 20,
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
  },
  cartButtonText: {
    marginLeft: 5,
    color: "#fff",
    fontWeight: "bold",
  },
  backgroundImage: {
    flex: 1,
    opacity: 0.8,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
