import React, { useEffect, useState } from 'react';

export const IconNames = {
  EditNameSolid: 'edit-name_solid',
  EditNameOutlined: 'edit-name-outlined',
  LetterSolid: 'letter-solid',
  LockSolid: 'lock-solid',
  LockOutlined: 'lock-outlined',
  UserSolid: 'user-solid',
};

export type IconName = (typeof IconNames)[keyof typeof IconNames];
type SvgProps = React.SVGProps<SVGSVGElement>;

interface IconProps {
  name: IconName;
  width?: number;
  height?: number;
  alt?: string;
  className?: string;
}

const DEFAULT_ICON_SIZE = 22;

const Icon = ({
  name,
  width = DEFAULT_ICON_SIZE,
  height = DEFAULT_ICON_SIZE,
  alt = '',
  className,
}: IconProps) => {
  const [ImportedComponent, setImportedComponent] =
    useState<React.ComponentType<SvgProps> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoading(true);

    const importIcon = async () => {
      try {
        // Using dynamic import with explicit .default access
        const importedSvg = await import(
          `../../../../public/icons/${name}.svg`
        );

        // Extract the default export which should be the React component
        if (importedSvg.default) {
          setImportedComponent(() => importedSvg.default);
        } else {
          setError(new Error(`No default export found for icon: ${name}`));
        }
      } catch (err) {
        console.error(`Error importing icon: ${name}`, err);
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };

    importIcon();
  }, [name]);

  if (isLoading || error || !ImportedComponent) return null;

  return (
    <ImportedComponent
      width={width}
      height={height}
      className={className}
      aria-label={alt}
    />
  );
};

export default Icon;
