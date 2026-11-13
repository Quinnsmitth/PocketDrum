import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  scrollContent: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
    paddingLeft: 55,
    paddingRight: 55,
    paddingTop: 10,
    minHeight: 55,
  },

  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  mainTitle: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: 'bold',
    color: '#111111',
  },

  subTitle: {
    fontSize: 12,
    color: '#666666',
    marginTop: 1,
  },

  homeButton: {
    borderWidth: 1.5,
    borderColor: '#222222',
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 14,
    backgroundColor: '#ffffff',
  },

  homeButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111111',
  },

  saveButton: {
    borderWidth: 1.5,
    borderColor: '#222222',
    borderRadius: 8,
    paddingVertical: 7,
    paddingHorizontal: 20,
  },

  saveButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111111',
  },

  mainLayout: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },

  gridSection: {
    flex: 1,
  },

  gridHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 3,
    paddingHorizontal: 8,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111111',
  },

  horizontalScrollContainer: {
    flexGrow: 0,
  },

  stepNumbersRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },

  stepNumber: {
    textAlign: 'center',
    fontSize: 9,
    color: '#888888',
  },

  boldStepNumber: {
    fontWeight: 'bold',
    color: '#111111',
  },

  instrumentBlock: {
    marginBottom: 3,
  },

  instrumentLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#222222',
    marginBottom: 1,
  },

  stepsRow: {
    flexDirection: 'row',
    gap: 2,
  },

  step: {
    height: 20,
    borderRadius: 3,
    borderWidth: 1,
  },

  stepInactive: {
    backgroundColor: '#ffffff',
    borderColor: '#cccccc',
  },

  stepActive: {
    backgroundColor: '#1c1c1e',
    borderColor: '#1c1c1e',
  },

  currentStepNumber: {
    color: '#0077ffff',
    fontWeight: 'bold',
  },

  // Playhead column: highlighted as it sweeps across the grid.
  stepPlayingInactive: {
    backgroundColor: '#ffe8d6',
    borderColor: '#0099ffff',
  },

  stepPlayingActive: {
    backgroundColor: '#0f0e0eff',
    borderColor: '#0099ffff',
  },

  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },

  legendBox: {
    width: 8,
    height: 8,
    backgroundColor: '#1c1c1e',
    borderRadius: 2,
    marginRight: 6,
  },

  legendText: {
    fontSize: 9,
    color: '#666666',
  },

  controlsSection: {
    width: 190,
    paddingRight: 20,
    justifyContent: 'flex-end',
  },

  controlBtn: {
    borderWidth: 1.5,
    borderColor: '#222222',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },

  activeControlBtn: {
    backgroundColor: '#f0f0f0',
  },

  controlBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#111111',
  },

  statusText: {
    fontSize: 10,
    color: '#777777',
    marginLeft: 55,
    marginBottom: 2,
  },

  tempoSection: {
    marginTop: 'auto',
    marginBottom: 45,
    marginLeft: 8,
  },

  tempoHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 4,
  },

  tempoTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111111',
  },

  tempoRange: {
    fontSize: 10,
    color: '#777777',
  },

  bpmControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  bpmBtn: {
    width: 32,
    height: 32,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },

  bpmBtnText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#111111',
  },

  bpmValueBox: {
    flex: 1,
    height: 32,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
  },

  bpmValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111111',
  },

  bpmUnit: {
    fontSize: 10,
    color: '#666666',
  },
});