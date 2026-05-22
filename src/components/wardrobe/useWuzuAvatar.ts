import { useCallback, useEffect, useRef } from 'react';
import {
  useRive,
  useViewModelInstanceColor,
  useViewModelInstanceTrigger,
  useViewModelInstanceArtboard,
  Layout,
  Fit,
} from '@rive-app/react-webgl2';
import {
  COLLAR_COLORS,
  EYE_COLORS,
  ARTBOARD_BINDINGS,
} from '@/data/manifest';

export interface EquipmentState {
  outfit: string;
  hat: string;
  inner: string;
  facial: string;
  blush: string;
  background: string;
  foreground: string;
  collarColorId: string;
  eyeColorId: string;
}

export const DEFAULT_EQUIPMENT: EquipmentState = {
  outfit: 'default',
  hat: 'default',
  inner: 'default',
  facial: 'default',
  blush: 'default',
  background: 'default',
  foreground: 'default',
  collarColorId: 'blue',
  eyeColorId: 'brown',
};

export type Mood = 'idle' | 'sad' | 'angry' | 'happy';

/**
 * Hook for rendering and controlling the Wuzu avatar.
 * Equipment state is managed externally so it persists across animal switches.
 */
export function useWuzuAvatar(
  animal: string,
  mood: Mood,
  equipment: EquipmentState,
) {
  const { rive, RiveComponent } = useRive({
    src: '/wuzu_full.riv',
    artboard: animal,
    stateMachines: mood,
    autoplay: true,
    autoBind: true,
    layout: new Layout({ fit: Fit.Contain }),
  });

  const loading = !rive;
  const viewModelInstance = rive?.viewModelInstance;

  // Color bindings
  const { setRgb: setCollarRgb } = useViewModelInstanceColor('collar', viewModelInstance);
  const { setRgb: setEyeRgb } = useViewModelInstanceColor('eye', viewModelInstance);

  // Triggers
  const { trigger: wagTail } = useViewModelInstanceTrigger('wagging_tail', viewModelInstance);
  const { trigger: tapTongue } = useViewModelInstanceTrigger('tapping_tongue', viewModelInstance);

  // Artboard bindings for equipment
  const { setValue: setClothesBack } = useViewModelInstanceArtboard('clothes_back', viewModelInstance);
  const { setValue: setClothesFront } = useViewModelInstanceArtboard('clothes_front', viewModelInstance);
  const { setValue: setHatFront } = useViewModelInstanceArtboard('hat_front', viewModelInstance);
  const { setValue: setHatBack } = useViewModelInstanceArtboard('hat_back', viewModelInstance);
  const { setValue: setBackground } = useViewModelInstanceArtboard('background', viewModelInstance);
  const { setValue: setForeground } = useViewModelInstanceArtboard('foreground', viewModelInstance);
  const { setValue: setInner } = useViewModelInstanceArtboard('inner', viewModelInstance);
  const { setValue: setFacial } = useViewModelInstanceArtboard('facial', viewModelInstance);
  const { setValue: setBlush } = useViewModelInstanceArtboard('blush', viewModelInstance);

  const getArtboardSetter = useCallback(
    (binding: string) => {
      switch (binding) {
        case 'clothes_back': return setClothesBack;
        case 'clothes_front': return setClothesFront;
        case 'hat_front': return setHatFront;
        case 'hat_back': return setHatBack;
        case 'background': return setBackground;
        case 'foreground': return setForeground;
        case 'inner': return setInner;
        case 'facial': return setFacial;
        case 'blush': return setBlush;
        default: return undefined;
      }
    },
    [setClothesBack, setClothesFront, setHatFront, setHatBack, setBackground, setForeground, setInner, setFacial, setBlush]
  );

  const applyEquipment = useCallback(
    (category: string, itemId: string) => {
      if (!rive) return;
      const bindings = ARTBOARD_BINDINGS[category];
      if (!bindings) return;

      for (const binding of bindings) {
        const setter = getArtboardSetter(binding);
        if (!setter) continue;

        if (itemId === 'default') {
          const defaultAb = rive.getBindableArtboard(`${binding}_default`) ??
            rive.getBindableArtboard('inner_default');
          if (defaultAb) setter(defaultAb);
        } else {
          const ab = rive.getBindableArtboard(`${binding}_${itemId}`);
          if (ab) setter(ab);
        }
      }
    },
    [rive, getArtboardSetter]
  );

  // Track previous equipment to detect external changes
  const prevEquipmentRef = useRef<EquipmentState>(equipment);

  // Apply all equipment when rive instance is first ready
  useEffect(() => {
    if (!rive) return;

    for (const category of Object.keys(ARTBOARD_BINDINGS)) {
      const itemId = equipment[category as keyof EquipmentState] as string;
      if (itemId) applyEquipment(category, itemId);
    }

    const collar = COLLAR_COLORS.find((c) => c.id === equipment.collarColorId);
    if (collar && setCollarRgb) setCollarRgb(collar.r, collar.g, collar.b);

    const eye = EYE_COLORS.find((c) => c.id === equipment.eyeColorId);
    if (eye && setEyeRgb) setEyeRgb(eye.r, eye.g, eye.b);

    prevEquipmentRef.current = equipment;
    setTimeout(() => wagTail?.(), 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rive, applyEquipment, setCollarRgb, setEyeRgb]);

  // React to equipment changes from parent (e.g. ItemGrid clicks)
  useEffect(() => {
    if (!rive) return;
    const prev = prevEquipmentRef.current;
    const curr = equipment;
    prevEquipmentRef.current = curr;

    // Apply changed equipment categories
    for (const category of Object.keys(ARTBOARD_BINDINGS)) {
      const key = category as keyof EquipmentState;
      if (curr[key] !== prev[key]) {
        applyEquipment(category, curr[key] as string);
      }
    }

    // Apply changed collar color
    if (curr.collarColorId !== prev.collarColorId) {
      const collar = COLLAR_COLORS.find((c) => c.id === curr.collarColorId);
      if (collar && setCollarRgb) setCollarRgb(collar.r, collar.g, collar.b);
    }

    // Apply changed eye color
    if (curr.eyeColorId !== prev.eyeColorId) {
      const eye = EYE_COLORS.find((c) => c.id === curr.eyeColorId);
      if (eye && setEyeRgb) setEyeRgb(eye.r, eye.g, eye.b);
    }

    wagTail?.();
    tapTongue?.();
  }, [equipment, rive, applyEquipment, setCollarRgb, setEyeRgb, wagTail, tapTongue]);

  const triggerAnimation = useCallback(() => {
    wagTail?.();
    tapTongue?.();
  }, [wagTail, tapTongue]);

  return {
    loading,
    RiveComponent,
    triggerAnimation,
  };
}
