import { IsNotEmpty, Matches } from 'class-validator';

const regex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;

export class CreateTrackedEntityEnrollmentDto {
  @IsNotEmpty()
  trackedEntityInstance: string;

  @IsNotEmpty()
  orgUnit: string;

  @IsNotEmpty()
  program: string;

  @IsNotEmpty()
  @Matches(regex, {
    message: 'enrollment date does not match YYYY-mm-dd',
  })
  enrollmentDate: Date;

  @IsNotEmpty()
  @Matches(regex, {
    message: 'incidentDate date does not match YYYY-mm-dd',
  })
  incidentDate: Date;
}
