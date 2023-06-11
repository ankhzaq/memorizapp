import { StyleSheet } from 'react-native';
import { black, green, white } from '../../variables';

const styles = StyleSheet.create({
  addBtn: {
    marginBottom: 20,
  },
  card: {
    alignItems: 'center',
    backgroundColor: green,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 20,
  },
  date: {
    borderRadius: 15,
    fontSize: 11,
    fontWeight: '600',
    padding: 1,
    position: 'absolute',
    right: 5,
    top: 2,
  },
  iconsCard: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  layout: {
    marginTop: 10,
    marginHorizontal: 15,
  },
  tag: {
    backgroundColor: white,
    borderColor: black,
    borderWidth: 2,
    color: black,
    marginRight: 5,
    paddingVertical: 3,
    paddingHorizontal: 5,
  },
  tags: {
    flexDirection: 'row',
  },
  icon: {
    color: black,
    fontSize: 20,
  },
  iconWrapper: {
    backgroundColor: white,
    borderColor: black,
    borderRadius: 20,
    borderWidth: 1,
    marginLeft: 10,
    paddingHorizontal: 12,
    paddingVertical: 11,
  },
});

export default styles;
