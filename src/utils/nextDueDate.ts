import { addDays, addMonths, addYears } from 'date-fns';
import { BillingCycle } from '../interfaces/BillingCycle';

export const billingYearToYear = (billingCycle: BillingCycle) => {
  if (billingCycle === BillingCycle.ANNUALLY) {
    return 1;
  }
  if (billingCycle === BillingCycle.BIENNIALLY) {
    return 2;
  }
  if (billingCycle === BillingCycle.TRIENNIALLY) {
    return 3;
  }
  throw Error('Invalid input billing year.');
};

export const yearToBillingYear = (year: number) => {
  if (year === 1) {
    return BillingCycle.ANNUALLY;
  }
  if (year === 2) {
    return BillingCycle.BIENNIALLY;
  }
  if (year === 3) {
    return BillingCycle.TRIENNIALLY;
  }
  throw Error('Invalid input year.');
};

export const nextDueDate = (now: Date, billingCycle: BillingCycle) => {
  if (billingCycle === BillingCycle.DAILY) {
    return addDays(now, 1);
  }
  if (billingCycle === BillingCycle.MONTHLY) {
    return addMonths(now, 1);
  }
  if (billingCycle === BillingCycle.QUARTERLY) {
    return addMonths(now, 3);
  }
  if (billingCycle === BillingCycle.SEMIANNUALLY) {
    return addMonths(now, 6);
  }
  if (billingCycle === BillingCycle.ANNUALLY) {
    return addYears(now, billingYearToYear(BillingCycle.ANNUALLY));
  }
  if (billingCycle === BillingCycle.BIENNIALLY) {
    return addYears(now, billingYearToYear(BillingCycle.BIENNIALLY));
  }
  if (billingCycle === BillingCycle.TRIENNIALLY) {
    return addYears(now, billingYearToYear(BillingCycle.TRIENNIALLY));
  }
  return now;
};

export const getBillingCycleDays = (billingCycle: BillingCycle) => {
  if (billingCycle === BillingCycle.DAILY) {
    return 1;
  }
  if (billingCycle === BillingCycle.MONTHLY) {
    return 30;
  }
  if (billingCycle === BillingCycle.QUARTERLY) {
    return 90;
  }
  if (billingCycle === BillingCycle.SEMIANNUALLY) {
    return 180;
  }
  if (billingCycle === BillingCycle.ANNUALLY) {
    return 365;
  }
  if (billingCycle === BillingCycle.BIENNIALLY) {
    return 730;
  }
  if (billingCycle === BillingCycle.TRIENNIALLY) {
    return 1095;
  }
  return 1;
};
