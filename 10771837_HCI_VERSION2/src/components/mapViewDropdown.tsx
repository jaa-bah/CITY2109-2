// src/components/mapViewDropdown.tsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// View type options
export type MapViewType = '3D' | 'Satellite' | 'Topographic' | 'Terrain' | 'List';

// Props interface
interface MapViewDropdownProps {
  visible: boolean;
  currentView: MapViewType;
  onClose: () => void;
  onSelectView: (viewType: MapViewType) => void;
}

// Map view option interface
interface ViewOption {
  id: MapViewType;
  label: string;
}

const MapViewDropdown: React.FC<MapViewDropdownProps> = ({
  visible,
  currentView,
  onClose,
  onSelectView,
}) => {
  // View options
  const viewOptions: ViewOption[] = [
    { id: '3D', label: '3D View' },
    { id: 'Satellite', label: 'Satellite View' },
    { id: 'Topographic', label: 'Topographic View' },
    { id: 'Terrain', label: 'Terrain View' },
    { id: 'List', label: 'List View' },
  ];

  // Handle option selection
  const handleSelectOption = (option: ViewOption): void => {
    onSelectView(option.id);
    onClose();
  };

  // Render option item
  const renderItem = ({ item }: { item: ViewOption }) => (
    <TouchableOpacity
      style={[
        styles.optionItem,
        currentView === item.id && styles.selectedOptionItem,
      ]}
      onPress={() => handleSelectOption(item)}
    >
      <Text
        style={[
          styles.optionText,
          currentView === item.id && styles.selectedOptionText,
        ]}
      >
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.dropdownContainer}>
          <FlatList
            data={viewOptions}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            style={styles.optionsList}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  dropdownContainer: {
    position: 'absolute',
    top: 153, // Position below the view header
    left: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 5,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  optionsList: {
    maxHeight: 300,
  },
  optionItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  selectedOptionItem: {
    backgroundColor: '#F0F0F5',
  },
  optionText: {
    fontSize: 17,
    color: '#333',
  },
  selectedOptionText: {
    fontWeight: '500',
    color: '#000',
  },
});

export default MapViewDropdown;