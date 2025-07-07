export const getTodayString = (): string => new Date().toISOString().split('T')[0];

export const getDateString = (date: Date): string => date.toISOString().split('T')[0];

export const getStartOfWeek = (date: Date): Date => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff));
};

export const formatTime = (date: Date): string => date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });

export const formatDate = (date: Date): string => date.toLocaleDateString('de-DE', { weekday: 'long', month: 'long', day: 'numeric' });

export const getHabitStreak = (completions: string[]): number => {
    let streak = 0;
    if (completions.length === 0) return 0;
    const sortedDates = completions.map(c => new Date(c)).sort((a, b) => b.getTime() - a.getTime());
    let currentDate = new Date();

    if (!completions.includes(getDateString(currentDate))) {
      currentDate.setDate(currentDate.getDate() - 1);
    }

    for (const date of sortedDates) {
        if (getDateString(date) === getDateString(currentDate)) {
            streak++;
            currentDate.setDate(currentDate.getDate() - 1);
        } else if (date.getTime() < currentDate.getTime()) {
            break;
        }
    }
    return streak;
};
