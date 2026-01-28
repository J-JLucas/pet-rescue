export function calculateAge(birthday: string | null): string {
  if (!birthday) return 'Unknown age';

  const birth = new Date(birthday);
  const now = new Date();

  const years = now.getFullYear() - birth.getFullYear();
  const months = now.getMonth() - birth.getMonth();

  const totalMonths = years * 12 + months;

  if (totalMonths < 1) return 'Under 1 month';
  if (totalMonths < 12) return `${totalMonths} month${totalMonths === 1 ? '' : 's'}`;

  const displayYears = Math.floor(totalMonths / 12);
  return `${displayYears} year${displayYears === 1 ? '' : 's'}`;
}
